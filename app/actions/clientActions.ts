"use server";

import clientPromise from '../../lib/mongodb';
import { ClientSchema, Client } from '../../models/client';
import { ObjectId } from 'mongodb';

export async function createClient(data: Omit<Client, '_id'>) {
  const parsed = ClientSchema.omit({ _id: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid client data');
  const db = (await clientPromise).db();
  const result = await db.collection('clients').insertOne({
    ...parsed.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { _id: result.insertedId, ...parsed.data };
}

export async function getClients() {
  const db = (await clientPromise).db();
  return db.collection('clients').find().toArray();
}

export async function updateClient(id: string, data: Partial<Client>) {
  const db = (await clientPromise).db();
  const update = { ...data, updatedAt: new Date() };
  await db.collection('clients').updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  return db.collection('clients').findOne({ _id: new ObjectId(id) });
}

export async function deleteClient(id: string) {
  const db = (await clientPromise).db();
  await db.collection('clients').deleteOne({ _id: new ObjectId(id) });
  return { success: true };
} 