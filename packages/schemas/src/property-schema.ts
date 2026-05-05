import z from 'zod';
import { componentSchema } from './component-schema.js';

export const propertySchema = componentSchema.extend({
  cadastral_id: z.string().min(6),
  type: z.literal('property').optional().default('property'),
  parent_id: z.null().or(z.undefined()),
});
