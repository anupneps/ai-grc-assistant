import { z } from 'zod';

export const KnowledgeBaseSchema = z.object({
  _id: z.string().optional(),
  regulation: z.string(),
  version: z.string(),
  content: z.string(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type KnowledgeBase = z.infer<typeof KnowledgeBaseSchema>; 