"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[640px] mx-auto px-8 pt-10 pb-16 text-center">
      <div className="card p-12">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.10] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl font-bold text-white">404</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-[#8a8a8a] mb-8">This page doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-colors">
          <Home size={16} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

