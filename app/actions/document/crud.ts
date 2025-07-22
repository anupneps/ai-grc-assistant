"use server";

import clientPromise from '../../../lib/mongodb';
import { DocumentSchema, Document } from '../../../models/document';
import { ObjectId } from 'mongodb';

export async function uploadDocument(data: Omit<Document, '_id' | 'uploadDate'>) {
  const parsed = DocumentSchema.omit({ _id: true, uploadDate: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid document data');
  const db = (await clientPromise).db();
  const doc = {
    ...parsed.data,
    uploadDate: new Date(),
  };
  const result = await db.collection('documents').insertOne(doc);
  return { _id: result.insertedId, ...doc };
}

export async function classifyDocument(id: string, classification: string) {
  const db = (await clientPromise).db();
  await db.collection('documents').updateOne(
    { _id: new ObjectId(id) },
    { $set: { classification } }
  );
  return db.collection('documents').findOne({ _id: new ObjectId(id) });
}

export async function listDocuments(clientId: string) {
  const db = (await clientPromise).db();
  return db.collection('documents').find({ clientId }).toArray();
} 