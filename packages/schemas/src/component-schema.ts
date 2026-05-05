import z from 'zod';

export const componentTypeSchema = z.enum([
  'property',
  'building',
  'appartment',
  'wall',
  'paint',
  'material',
  'roof',
  'window',
  'glass',
  'heating_provider',
  'heating_distributor',
  'hallway',
  'room',
  'staircase',
  'outlet',
  'sink',
  'faucet',
  'toilet',
  'drainage_ditch',
]);

export const componentSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(3),
  parent_id: z.uuid().optional(),
  type: componentTypeSchema,
  metadata: z.record(z.string(), z.any()).optional(),
});

export const componentRoleSchema = z.object({
  user_id: z.uuid(),
  component_id: z.uuid(),
  role: z.enum(['owner', 'lessor']),
});
