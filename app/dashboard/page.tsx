"use client";
import React, { useState } from 'react';
import { UserCircleIcon, ArrowRightOnRectangleIcon, ArrowUpTrayIcon, ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/24/outline';

const mockClients = [
  'General Chat',
  'Acme Inc.',
  'Globex S A.',
  'Initech Ltd',
  'Client 1',
];

const mockCitations = [
  { id: 1, text: 'NIS2 Directive, Art. 21', ref: 'policy-paragraph-1' },
];

const mockDocs = [
  { name: 'GDPR Policy' },
  { name: 'ISO 27001 Controls' },
  { name: 'NIS2 Summary' },
  { name: 'SOC2 Checklist' },
  { name: 'HIPAA Guidance' },
  { name: 'PCI DSS Matrix' },
  { name: 'Custom Client Policy' },
];

const mockChatHistory = [
  { role: 'user', content: 'Draft an access control policy' },
  { role: 'ai', content: 'Sure! I will draft an access control policy for you...' },
];

const aiModes = [
  { value: 'general', label: 'General Chat' },
  { value: 'policy', label: 'Policy Drafting' },
  { value: 'gap', label: 'Gap Analysis' },
  { value: 'regulation', label: 'Regulation Q&A' },
];

function UploadModal({ open, onClose, title }: { open: boolean; onClose: () => void; title: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        <h3 className="font-bold text-lg mb-4 text-gray-900">Upload {title}</h3>
        <input type="file" className="mb-4" />
        <button className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Upload</button>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default function DashboardPage() {
  const [selectedClient, setSelectedClient] = useState('General Chat');
  const [search, setSearch] = useState('');
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAIResponse] = useState('Sure! I will draft an access control policy for you...');
  const [policyDraft, setPolicyDraft] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, nunc urna aliquam nunc, eget aliquam nunc urna eu nunc.');
  const [showClientUpload, setShowClientUpload] = useState(false);
  const [showKBUpload, setShowKBUpload] = useState(false);
  const [loading, setLoading] = useState(false); // Simulate loading state
  const [highlightedRef, setHighlightedRef] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [aiMode, setAiMode] = useState('general');
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [showCanvasOverlay, setShowCanvasOverlay] = useState(false);

  function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: prompt },
        { role: 'ai', content: aiMode === 'policy' ? 'This is a generated access control policy. All access to company systems must be authorized and logged.¹' : 'Here is your answer...' },
      ]);
      setPrompt('');
      setPolicyDraft('This is a generated access control policy. All access to company systems must be authorized and logged.¹');
    }, 2000);
  }

  function renderPolicyDraft() {
    const parts = policyDraft.split('¹');
    return (
      <>
        <span id="policy-paragraph-1" className={highlightedRef === 'policy-paragraph-1' ? 'bg-yellow-200 transition' : ''}>
          {parts[0]}
          {mockCitations.length > 0 && (
            <sup
              className="ml-1 cursor-pointer text-indigo-600 font-bold relative"
              onClick={() => setHighlightedRef('policy-paragraph-1')}
              onMouseEnter={() => setShowTooltip(1)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              [1]
              {showTooltip === 1 && (
                <span className="absolute left-4 top-0 bg-white border rounded shadow px-2 py-1 text-xs z-10">
                  {mockCitations[0].text}
                </span>
              )}
            </sup>
          )}
        </span>
        {parts[1] && <span>{parts[1]}</span>}
      </>
    );
  }

  function renderChatHistory() {
    return (
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px] p-2 bg-gray-900 rounded border border-gray-700">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}> 
            <div className={`rounded-2xl px-4 py-2 max-w-[70%] text-sm shadow font-medium ${msg.role === 'user' ? 'text-cyan-300 bg-gray-700' : 'bg-gray-700 text-gray-100 border border-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start"><SkeletonLoader /></div>
        )}
      </div>
    );
  }

  const isGeneralChat = selectedClient === 'General Chat';

  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-to-br from-indigo-50 to-white">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800 shadow-lg backdrop-blur">
        <div className="flex items-center gap-4">
          {/* Logo Image - larger and more prominent */}
          <img src="/compli-EU.png" alt="Compli-EU Logo" className="w-14 h-14 rounded-full object-cover bg-white shadow-lg border-2 border-cyan-400" />
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-cyan-300 tracking-tight leading-tight">AI Consultant</span>
            <span className="text-xs text-gray-300 font-semibold mt-0.5">Your EU Compliance Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white font-bold border-b-2 border-white pb-0.5">Dashboard</button>
          <button className="text-gray-200 font-semibold hover:text-cyan-300 transition">Manage Clients</button>
          <button className="text-gray-500 font-semibold cursor-not-allowed">Coming Soon</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="hover:bg-gray-800 p-1.5 rounded-full"><UserCircleIcon className="w-6 h-6 text-gray-200" /></button>
          <button className="hover:bg-gray-800 p-1.5 rounded-full"><ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-200" /></button>
        </div>
      </nav>
      <div className="flex flex-1 min-h-0 bg-gray-900 h-full min-h-0">
        {/* Left: Clients/Projects */}
        <aside className="w-60 border-r bg-gray-900/80 p-4 flex flex-col border-gray-800 text-gray-200 backdrop-blur h-full min-h-0 sticky top-0">
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-3 px-2 py-1.5 rounded border border-gray-700 w-full text-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <div className="mb-8">
            <button
              className={`w-full text-left px-2.5 py-1.5 rounded transition font-medium mb-3 border-b border-gray-800 pb-1 bg-gray-800 shadow ${selectedClient === 'General Chat' ? 'ring-2 ring-blue-400' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setSelectedClient('General Chat')}
            >
              General Chat
            </button>
          </div>
          {/* Project/Client Group */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg shadow p-3 mb-8 flex-1 flex flex-col h-[calc(100vh-180px)]">
            <button
              className={`w-full text-left px-2.5 py-1.5 rounded transition font-medium mb-2 border-b border-gray-700 pb-1 bg-gray-800 shadow ${selectedClient === 'Project/Client' ? 'ring-2 ring-blue-400' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setSelectedClient('Project/Client')}
            >
              Project/Client
            </button>
            <div className="border-b border-gray-700 my-2"></div>
            <ul className="space-y-1 mt-1 overflow-y-auto bg-gray-900 rounded p-1 flex-1">
              {mockClients
                .filter(
                  c =>
                    c.toLowerCase().includes(search.toLowerCase()) &&
                    c !== 'General Chat' &&
                    c !== 'Project/Client'
                )
                .map(client => (
                  <li key={client}>
                    <button
                        className={`w-full text-left px-3 py-2 rounded-lg transition font-medium shadow-none border border-transparent ${
                          selectedClient === client
                            ? 'bg-blue-900/60 text-blue-100 border-blue-400'
                            : 'hover:bg-gray-800 text-gray-200 bg-gray-900 border-gray-800'
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        {client}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* Center: Chat, Upload, Canvas, Citations */}
          <main className="flex-1 flex flex-col px-6 py-5 gap-3 bg-transparent h-full min-h-0 text-white text-[15px]">
            <h1 className="text-lg font-extrabold text-white mb-1">How can I help you with GRC today?</h1>
            {/* AI Agentic Mode Selector */}
            <div className="mb-1 flex gap-2 items-center text-sm">
              <span className="font-semibold text-gray-300">AI Mode:</span>
              <select
                className="border border-gray-700 rounded px-2 py-1 text-sm bg-gray-900 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={aiMode}
                onChange={e => setAiMode(e.target.value)}
              >
                {aiModes.map(mode => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>
            </div>
            {/* Chat History (always visible) */}
            {renderChatHistory()}
            {/* Chat Box */}
            <div className="flex gap-2 mt-2 items-center text-base">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-700 rounded text-base bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Type your request..."
                onKeyDown={e => { if (e.key === 'Enter') handleGenerate(); }}
              />
              <button onClick={() => setShowClientUpload(true)} className="w-9 h-9 flex items-center justify-center rounded-full border border-cyan-400 text-cyan-300 bg-gray-800 hover:bg-gray-700 shadow transition">
                <ArrowUpTrayIcon className="w-5 h-5" />
              </button>
              <button onClick={handleGenerate} className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300 font-semibold shadow bg-transparent hover:bg-gray-800 transition text-base">Send</button>
            </div>
            {/* Placeholder for uploaded files below chat input */}
            <div className="min-h-[24px] mb-1"></div>
            {/* If not General Chat, show upload, canvas, citations */}
            {!isGeneralChat && (
              <>
                {/* Upload Button */}
                {/* Removed Upload Button from here */}
                {/* AI Response & Canvas */}
                <div className="flex gap-5 flex-1 min-h-0">
                  <div className="flex-1 flex flex-col min-h-0 h-full">
                    <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 flex flex-col flex-1 min-h-0 h-full overflow-y-auto shadow-lg backdrop-blur relative">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-[15px] text-cyan-200">Access Control Policy</div>
                        <button onClick={() => setShowCanvasOverlay(true)} className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400 text-cyan-300 bg-gray-800 hover:bg-gray-700 shadow transition" title="Expand">
                          <ArrowsPointingOutIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded p-3 text-gray-100 flex-1 mb-2 min-h-[100px] relative text-[15px] leading-relaxed">
                        {loading ? <SkeletonLoader /> : renderPolicyDraft()}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button className="px-3 py-2 rounded-lg border border-cyan-400 text-cyan-300 font-semibold bg-transparent hover:bg-gray-800 transition text-sm">Revise Draft</button>
                        <button className="px-3 py-2 rounded-lg border border-cyan-400 text-cyan-300 font-semibold bg-transparent hover:bg-gray-800 transition text-sm">Approve</button>
                      </div>
                    </div>
                  </div>
                  {/* Citations: Only show if citations exist and document is loaded */}
                  {mockCitations.length > 0 && !loading && (
                    <div className="w-60 bg-gray-800/80 border border-gray-700 rounded-xl p-4 h-fit shadow-lg backdrop-blur">
                      <div className="font-bold mb-2 text-cyan-200">Citations</div>
                      <ul className="text-gray-200 text-sm list-disc pl-4">
                        {mockCitations.map(cite => (
                          <li key={cite.id}>
                            <button
                              className="text-left text-cyan-200 hover:underline"
                              onClick={() => setHighlightedRef(cite.ref)}
                            >
                              {cite.text}
                            </button>
                            <span className="bg-yellow-300 text-gray-900 px-2 py-1 rounded font-semibold text-xs ml-2">Cited</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </main>

          {/* Right: Knowledge Base & Regulation Watch */}
          <aside className="w-80 border-l bg-gray-900/80 p-4 flex flex-col gap-5 h-full min-h-0 border-gray-800 text-gray-200 backdrop-blur">
            <div>
              <h2 className="font-bold text-base text-white mb-2">Knowledge Base Docs</h2>
              
              <div className="grid grid-cols-2 gap-0.5 mb-4 p-2">
                {mockDocs.map((doc, idx) => (
                  <div key={doc.name} className={`flex items-center border-b border-r border-white/60 last:border-r-0 bg-gray-900/60 px-2 py-1 text-xs`}> 
                    <input className="bg-transparent border-none text-white w-full text-xs" defaultValue={doc.name} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2 mb-4 items-center gap-2 ">
                <span className="text-xs text-gray-400 font-semibold">Add more documents to your Knowledge Base</span>
                <button onClick={() => setShowKBUpload(true)} className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400 text-cyan-300 bg-gray-800 hover:bg-gray-700 shadow transition">
                  <ArrowUpTrayIcon className="w-4 h-4" />
                </button>
              </div>
              <div className='border-b border-gray-700'></div>
            </div>
            <div>
              <h2 className="font-bold text-base text-cyan-200 mb-2 ">Regulation Watch</h2>
              <div className="text-gray-400 text-sm">No new updates.</div>
            </div>
          </aside>
        </div>
        {/* Modals for Upload */}
        <UploadModal open={showClientUpload} onClose={() => setShowClientUpload(false)} title="Client Document" />
        <UploadModal open={showKBUpload} onClose={() => setShowKBUpload(false)} title="Knowledge Base Document" />
        {/* Canvas Overlay Modal */}
        {showCanvasOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-w-2xl w-full mx-4 p-8 relative flex flex-col">
              <button onClick={() => setShowCanvasOverlay(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 shadow transition" title="Close">
                <XMarkIcon className="w-5 h-5" />
              </button>
              <div className="font-bold text-lg text-cyan-200 mb-4">Access Control Policy (Review)</div>
              <div className="bg-gray-800 rounded p-5 text-gray-100 flex-1 mb-4 min-h-[200px] text-base leading-relaxed max-h-[50vh] overflow-y-auto">
                {renderPolicyDraft()}
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowCanvasOverlay(false)} className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 font-semibold bg-transparent hover:bg-gray-800 transition text-base">Close</button>
                <button className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-300 font-semibold bg-transparent hover:bg-gray-800 transition text-base">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } 