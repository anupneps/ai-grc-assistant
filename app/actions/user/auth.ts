"use server";

import clientPromise from '../../../lib/mongodb';
import { UserSchema, User } from '../../../models/user';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function signupUser(data: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
  const parsed = UserSchema.omit({ _id: true, createdAt: true, updatedAt: true }).safeParse(data);
  if (!parsed.success) throw new Error('Invalid user data');
  const db = (await clientPromise).db();
  const existing = await db.collection('users').findOne({ email: parsed.data.email });
  if (existing) throw new Error('Email already registered');
  const passwordHash = await bcrypt.hash(parsed.data.passwordHash, 10);
  const user = {
    ...parsed.data,
    passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('users').insertOne(user);
  const { passwordHash: _, ...userWithoutPassword } = user;
  return { _id: result.insertedId, ...userWithoutPassword };
}

export async function signinUser(email: string, password: string) {
  const db = (await clientPromise).db();
  const user = await db.collection('users').findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 