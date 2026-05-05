import z from 'zod';
import { passwordSchema } from './password-schema.js';

export const resetPasswordSchema = z
  .object({
    token: z.jwt(),
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .refine(payload => payload.password1 === payload.password2, { error: 'auth:password-mismatch' });
