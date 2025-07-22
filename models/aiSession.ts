import { z } from 'zod';

export const AISessionSchema = z.object({
  _id: z.string().optional(),
  clientId: z.string(),
  prompt: z.string(),
  response: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type AISession = z.infer<typeof AISessionSchema>; 