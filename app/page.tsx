'use client';

import Link from 'next/link';
import { ShieldCheckIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-cyan-900 via-gray-900 to-blue-900 opacity-80" style={{filter: 'blur(8px)'}} />
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center max-w-5xl w-full mx-auto p-10 gap-12 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 relative z-10" style={{minHeight: 'calc(100vh - 40px)'}}>
        {/* Left: Branding & Hero */}
        <div className="flex flex-col items-center md:items-start flex-1 min-w-[300px] mt-2 md:mt-4">
          <h1 className="text-5xl font-extrabold text-cyan-300 mb-2 tracking-tight drop-shadow-lg">Compli-EU</h1>
          <span className="text-lg text-gray-200 font-semibold mb-2">AI-Powered GRC for the European Union</span>
          {/* Animated Human-in-the-loop Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300/20 text-yellow-200 font-bold text-sm shadow mt-1 animate-pulse ring-2 ring-yellow-400/40">
            <UserCircleIcon className="w-5 h-5 text-yellow-300 animate-spin-slow" /> Human-in-the-loop
          </span>
          <p className="text-gray-200 mt-6 mb-8 text-lg font-medium max-w-md">
            Empowering consultants with AI-driven tools for Governance, Risk, and Compliance across the EU. Draft, analyze, and review policies with confidence—always keeping a human in the loop. No full automation: you stay in control, ensuring every recommendation is verified by an expert.
          </p>
          <Link href="/dashboard">
            <button className="px-10 py-4 rounded-lg bg-cyan-600 text-white font-bold text-xl shadow hover:bg-cyan-700 transition">Get Started</button>
          </Link>
        </div>
        {/* Right: Features */}
        <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow border border-cyan-900">
            <ShieldCheckIcon className="w-10 h-10 text-cyan-400 mb-2 animate-float" />
            <span className="font-bold text-cyan-200 text-lg mb-1">EU Regulation Ready</span>
            <span className="text-gray-300 text-sm text-center">Stay ahead of GDPR, NIS2, and more with up-to-date compliance intelligence.</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow border border-cyan-900">
            <DocumentTextIcon className="w-10 h-10 text-cyan-400 mb-2 animate-float-delay" />
            <span className="font-bold text-cyan-200 text-lg mb-1">Policy Drafting</span>
            <span className="text-gray-300 text-sm text-center">Generate, revise, and review policies tailored to your clients’ needs.</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow border border-cyan-900">
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-cyan-400 mb-2 animate-float" />
            <span className="font-bold text-cyan-200 text-lg mb-1">Consultant-Focused</span>
            <span className="text-gray-300 text-sm text-center">AI as your assistant, not your replacement. Human expertise is always in the loop.</span>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-400 w-full relative z-10">
        &copy; {new Date().getFullYear()} Compli-EU. All rights reserved.
      </div>
      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
