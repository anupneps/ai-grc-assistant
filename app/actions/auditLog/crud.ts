"use server";

import clientPromise from '../../../lib/mongodb';
import { AuditLogSchema, AuditLog } from '../../../models/auditLog';
import { ObjectId } from 'mongodb';

export async function logAction(data: Omit<AuditLog, '_id' | 'createdAt'>) {
  const parsed = AuditLogSchema.omit({ _id: true, createdAt: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid audit log data');
  const db = (await clientPromise).db();
  const log = {
    ...parsed.data,
    createdAt: new Date(),
  };
  const result = await db.collection('audit_logs').insertOne(log);
  return { _id: result.insertedId, ...log };
}

export async function getAuditLogs({ userId, clientId, action }: { userId?: string; clientId?: string; action?: string }) {
  const db = (await clientPromise).db();
  const query: any = {};
  if (userId) query.userId = userId;
  if (clientId) query.target = clientId;
  if (action) query.action = action;
  return db.collection('audit_logs').find(query).toArray();
} 