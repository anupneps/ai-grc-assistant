"use server";

import clientPromise from '../../../lib/mongodb';
import { AISessionSchema, AISession } from '../../../models/aiSession';
import { ObjectId } from 'mongodb';

export async function createAISession(data: Omit<AISession, '_id' | 'createdAt' | 'updatedAt'>) {
  const parsed = AISessionSchema.omit({ _id: true, createdAt: true, updatedAt: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid AI session data');
  const db = (await clientPromise).db();
  const session = {
    ...parsed.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('ai_sessions').insertOne(session);
  return { _id: result.insertedId, ...session };
}

export async function getAISessionsByUserAndClient(userId: string, clientId: string) {
  const db = (await clientPromise).db();
  return db.collection('ai_sessions').find({ userId, clientId }).toArray();
} 