"use client";
import React, { useState } from 'react';

const mockCitations = [
  'NIS2 Directive, Art. 21',
];

export default function ChatPage() {
  const [prompt, setPrompt] = useState('Draft an access control policy');
  const [aiResponse, setAIResponse] = useState('Sure! I will draft an access control policy for you...');
  const [policyDraft, setPolicyDraft] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, nunc urna aliquam nunc, eget aliquam nunc urna eu nunc.');

  return (
    <div className="flex flex-col p-8 gap-6 h-full">
      <h1 className="text-2xl font-bold mb-2">How can I help you with GRC today?</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded text-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold border">Generate</button>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 border rounded p-4 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500 text-xl">🤖</span>
        <span className="text-gray-700 text-base">{aiResponse}</span>
      </div>
      <div className="flex gap-6 flex-1">
        {/* Policy Draft */}
        <div className="flex-1 bg-white border rounded p-6 flex flex-col">
          <div className="font-bold text-lg mb-2">Access Control Policy</div>
          <div className="bg-gray-100 rounded p-4 text-gray-600 flex-1 mb-4 min-h-[120px]">
            {policyDraft}
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 rounded border bg-white hover:bg-gray-100 font-semibold">Revise Draft</button>
            <button className="px-4 py-2 rounded border bg-indigo-600 text-white hover:bg-indigo-700 font-semibold">Approve</button>
          </div>
        </div>
        {/* Citations */}
        <div className="w-64 bg-white border rounded p-6">
          <div className="font-bold mb-2">Citations</div>
          <ul className="text-gray-700 text-sm list-disc pl-4">
            {mockCitations.map(cite => (
              <li key={cite}>{cite}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 