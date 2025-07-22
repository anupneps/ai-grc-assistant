import { z } from 'zod';

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  role: z.enum(['consultant', 'admin', 'viewer']).default('consultant'),
  associatedClients: z.array(z.string()).default([]),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>; 