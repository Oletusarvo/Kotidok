import z from 'zod';
import { registerUserDirectlyCredentialsSchema } from './register-user-directly-credentials-schema.js';

export const registerUserViaTokenSchema = registerUserDirectlyCredentialsSchema.extend({
  token: z.jwt(),
});
