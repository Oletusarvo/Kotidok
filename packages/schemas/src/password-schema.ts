import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8)
  .max(16)
  .refine(
    pass => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(pass);
    },
    {
      error: 'auth:invalid-password-format',
    },
  );
