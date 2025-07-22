import { z } from 'zod';

export const ClientSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email().optional(),
  projects: z.array(z.string()).optional(),
  settings: z.record(z.string(), z.any()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Client = z.infer<typeof ClientSchema>; 