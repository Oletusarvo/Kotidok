import z from 'zod';
import { createHandler } from '../../../server-utils/create-handler';
import { ExpressRequest } from '../../../server-utils/types/express';
import { tablenames } from '../../../tablenames';
import { db } from '../../../db-config';
import { verifyPassword } from '../../../server-utils/password';
import { createJWT } from '../../../server-utils/jwt';
import { serverConfig } from '../../../server-config';
import { loginUserCredentialsSchema } from '@kotidok/schemas';

/**Authorizes a user, sets the access token cookie, and returns the session token. */
export const loginUserHandler = createHandler(
  async (req: ExpressRequest<z.infer<typeof loginUserCredentialsSchema>>, res) => {
    const credentials = req.data;
    const user = await db({ ud: tablenames.user_data })
      .where({
        email: credentials.email,
      })

      .select('ud.email', 'ud.password', 'ud.id')
      .first();

    if (!user || !(await verifyPassword(credentials.password, user.password))) {
      return res.status(401).json({
        error: 'auth:credentials-invalid',
      });
    }

    const token = createJWT({
      id: user.id,
      email: user.email,
    });

    return res
      .status(200)
      .cookie(serverConfig.accessTokenName, token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        token,
      });
  },
);
