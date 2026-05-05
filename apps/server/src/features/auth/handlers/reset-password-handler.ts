import z from 'zod';
import { createHandler } from '../../../server-utils/create-handler';
import { resetPasswordSchema } from '@kotidok/schemas';
import { ExpressRequest } from '../../../server-utils/types/express';
import { verifyJWT } from '../../../server-utils/jwt';
import { db } from '../../../db-config';
import { tablenames } from '../../../tablenames';
import { hashPassword } from '../../../server-utils/password';

export const resetPasswordHandler = createHandler(
  async (req: ExpressRequest<z.infer<typeof resetPasswordSchema>>, res) => {
    const { token, password1 } = req.data;
    const decoded = verifyJWT(token) as { id: string };
    await db(tablenames.user_data)
      .where({ id: decoded.id })
      .update({
        password: await hashPassword(password1),
      });

    return res.status(200).end();
  },
);
