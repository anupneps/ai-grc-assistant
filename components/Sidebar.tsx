'use client';
import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-center border-b">
        <span className="font-bold text-lg tracking-wide text-indigo-600">GRC Copilot</span>
      </div>
      {/* Navigation removed for now */}
      <div className="flex-1" />
      <div className="p-4 text-xs text-gray-400">© {new Date().getFullYear()} GRC Copilot</div>
    </aside>
  );
} 