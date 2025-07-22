"use server";

import OpenAI from 'openai';

export async function chatWithAI(prompt: string, context: any) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful compliance assistant. Use the provided context if available.' },
      { role: 'user' as const, content: prompt },
      ...(context ? [{ role: 'system' as const, content: JSON.stringify(context) }] : [])
    ],
    temperature: 0.2,
  });
  return response.choices[0].message.content;
} 