"use server";

import OpenAI from 'openai';

export async function performGapAnalysis(documents: any[], frameworks: string[]) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Perform a compliance gap analysis for the following documents and frameworks: ${frameworks.join(', ')}. Documents: ${JSON.stringify(documents)}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a compliance gap analysis expert.' },
      { role: 'user' as const, content: prompt }
    ],
    temperature: 0.2,
  });
  return response.choices[0].message.content;
} 