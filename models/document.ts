import { z } from 'zod';

export const DocumentSchema = z.object({
  _id: z.string().optional(),
  clientId: z.string(),
  name: z.string(),
  type: z.enum(['pdf', 'docx', 'xlsx', 'other']),
  classification: z.string().optional(),
  uploadDate: z.date().optional(),
  url: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Document = z.infer<typeof DocumentSchema>; 