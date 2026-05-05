import z from 'zod';
import { passwordSchema } from './password-schema.js';

export const registerUserDirectlyCredentialsSchema = z
  .object({
    email: z.email(),
    password: passwordSchema,
    password2: z.string(),
    tosAccepted: z
      .string()
      .transform(val => val === 'on')
      .pipe(
        z.literal(true, {
          error: 'auth:tos_not_accepted',
        }),
      ),
  })
  .refine(
    credentials => {
      return credentials.password === credentials.password2;
    },
    {
      error: 'auth:password-mismatch',
    },
  );
