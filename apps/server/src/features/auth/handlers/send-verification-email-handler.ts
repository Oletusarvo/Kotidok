import { db } from '../../../db-config';
import { createHandler } from '../../../server-utils/create-handler';
import { createJWT } from '../../../server-utils/jwt';
import { ExpressRequest } from '../../../server-utils/types/express';
import { tablenames } from '../../../tablenames';

/**Sends a verification email. */
export const sendVerificationEmailHandler = createHandler(async (req: ExpressRequest, res) => {
  const credentials = req.data;
  const userRecord = await db(tablenames.user_data)
    .where({ email: credentials.email })
    .select('id')
    .first();
  if (userRecord) {
    return res.status(409).json({
      error: 'auth:user-exists',
    });
  }

  const token = createJWT(
    { email: credentials.email },
    {
      expiresIn: '24h',
    },
  );

  const registerLink = `${process.env.DOMAIN_URL}/api/auth/register?token=${token}`;
  //TODO: Send an email through the brevo api.
  return res.status(200).end();
});
