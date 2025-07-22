"use server";

import OpenAI from 'openai';

export async function generatePolicyDraft(prompt: string, context: any) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a compliance policy generator. Use the provided context to draft a policy.' },
      { role: 'user' as const, content: prompt },
      ...(context ? [{ role: 'system' as const, content: JSON.stringify(context) }] : [])
    ],
    temperature: 0.2,
  });
  return response.choices[0].message.content;
} 