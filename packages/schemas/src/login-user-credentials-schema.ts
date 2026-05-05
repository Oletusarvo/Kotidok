import z from 'zod';

export const loginUserCredentialsSchema = z.object({
  email: z.email(),
  password: z.string(),
});
