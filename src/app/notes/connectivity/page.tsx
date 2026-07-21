"use client";

import { Globe } from "lucide-react";
import { connectivityExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function ConnectivityPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Express + MongoDB</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Connect MongoDB with Express.js and React applications</p>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h3 className="text-sm font-semibold text-white mb-4">Architecture Flow</h3>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm">
          {[
            { label: "React (Client)", color: "text-white" },
            { label: "Express (Server)", color: "text-gray-300" },
            { label: "MongoDB", color: "text-gray-300" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] font-medium ${item.color}`}>{item.label}</span>
              {i < 2 && <span className="text-[#5a5a5a]">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {connectivityExamples.map((ex, i) => (
          <div key={i} className="card p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4">{ex.title}</h3>
            <CodeBlock code={ex.code} />
            <p className="text-sm text-[#8a8a8a] leading-relaxed mt-3">{ex.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



