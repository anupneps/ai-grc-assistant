import { z } from 'zod';

export const AuditLogSchema = z.object({
  _id: z.string().optional(),
  action: z.string(),
  userId: z.string().optional(),
  target: z.string().optional(),
  details: z.record(z.string(), z.any()).optional(),
  createdAt: z.date().optional(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>; 