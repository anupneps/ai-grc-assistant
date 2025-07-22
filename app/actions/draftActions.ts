"use server";

import clientPromise from '../../lib/mongodb';
import { DraftSchema, Draft } from '../../models/draft';
import { ObjectId } from 'mongodb';

export async function createDraft(data: Omit<Draft, '_id' | 'createdAt' | 'updatedAt' | 'status'>) {
  const parsed = DraftSchema.omit({ _id: true, createdAt: true, updatedAt: true, status: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid draft data');
  const db = (await clientPromise).db();
  const draft = {
    ...parsed.data,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('drafts').insertOne(draft);
  return { _id: result.insertedId, ...draft };
}

export async function updateDraft(id: string, data: Partial<Draft>) {
  const db = (await clientPromise).db();
  const update = { ...data, updatedAt: new Date() };
  await db.collection('drafts').updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  return db.collection('drafts').findOne({ _id: new ObjectId(id) });
}

export async function approveDraft(id: string) {
  const db = (await clientPromise).db();
  await db.collection('drafts').updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: 'approved', updatedAt: new Date() } }
  );
  return db.collection('drafts').findOne({ _id: new ObjectId(id) });
}

export async function reviseDraft(id: string, content: string) {
  const db = (await clientPromise).db();
  await db.collection('drafts').updateOne(
    { _id: new ObjectId(id) },
    { $set: { content, status: 'revised', updatedAt: new Date() } }
  );
  return db.collection('drafts').findOne({ _id: new ObjectId(id) });
} 