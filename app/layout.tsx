import './globals.css';
import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full min-h-0">
      <body className="bg-gray-50 text-gray-900 h-full min-h-0">
        {/* Fixed Logo Top Left */}
        <Link href="/" className="fixed top-4 left-4 z-50">
          <img src="/compli-EU.png" alt="Compli-EU Logo" className="w-14 h-14 rounded-full object-cover bg-white shadow-lg border-2 border-cyan-400" />
        </Link>
        {children}
      </body>
    </html>
  );
}
