import { registerUserDirectlyCredentialsSchema } from '@kotidok/schemas';
import { ExpressRequest } from '../../../server-utils/types/express';
import { createHandler } from '../../../server-utils/create-handler';
import { hashPassword } from '../../../server-utils/password';
import { tablenames } from '../../../tablenames';
import { db } from '../../../db-config';
import z from 'zod';

/**Registers a user by directly creating a new entry in the database, without email verification. */
export const registerUserDirectlyHandler = createHandler(
  async (req: ExpressRequest<z.infer<typeof registerUserDirectlyCredentialsSchema>>, res) => {
    const credentials = req.data;
    if (!credentials.tosAccepted) {
      return res.status(400).json({
        error: 'auth:terms_not_accepted',
      });
    }

    await db(tablenames.user_data).insert({
      email: credentials.email,
      password: await hashPassword(credentials.password),
      terms_accepted_at: new Date(),
    });

    return res.status(200).end();
  },
  (err, res) => {
    const msg = err.message.toLowerCase();
    if (msg.includes('duplicate')) {
      if (msg.includes('user_email')) {
        return res.status(409).json({
          error: 'auth:user-exists',
        });
      }
    }
  },
);
