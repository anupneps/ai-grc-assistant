import { z } from 'zod';

export const DraftSchema = z.object({
  _id: z.string().optional(),
  clientId: z.string(),
  content: z.string(),
  version: z.number().optional(),
  status: z.enum(['draft', 'approved', 'revised']).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Draft = z.infer<typeof DraftSchema>; 