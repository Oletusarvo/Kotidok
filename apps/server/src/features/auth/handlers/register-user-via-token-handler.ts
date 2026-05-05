import z from 'zod';
import { createHandler } from '../../../server-utils/create-handler';
import { ExpressRequest } from '../../../server-utils/types/express';
import { registerUserDirectlyHandler } from './register-user-directly-handler';
import { registerUserViaTokenSchema } from '@kotidok/schemas';
import { verifyJWT } from '../../../server-utils/jwt';

/**Registers a user by decoding the token sent in a verification email. */
export const registerUserViaTokenHandler = createHandler(
  async (req: ExpressRequest<z.infer<typeof registerUserViaTokenSchema>>, res) => {
    const { token, password, password2 } = req.data;
    const { email } = verifyJWT(token) as { email: string };

    req.data = {
      email,
      password,
      password2,
    } as any;

    return await registerUserDirectlyHandler(req, res);
  },
);
