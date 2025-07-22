"use server";

import clientPromise from '../../lib/mongodb';
import { KnowledgeBaseSchema, KnowledgeBase } from '../../models/knowledgeBase';
import { ObjectId } from 'mongodb';

export async function uploadRegulation(data: Omit<KnowledgeBase, '_id' | 'createdAt' | 'updatedAt'>) {
  const parsed = KnowledgeBaseSchema.omit({ _id: true, createdAt: true, updatedAt: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid regulation data');
  const db = (await clientPromise).db();
  const doc = {
    ...parsed.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('knowledge_base').insertOne(doc);
  return { _id: result.insertedId, ...doc };
}

export async function getRegulations(regulation?: string, version?: string) {
  const db = (await clientPromise).db();
  const query: any = {};
  if (regulation) query.regulation = regulation;
  if (version) query.version = version;
  return db.collection('knowledge_base').find(query).toArray();
} 