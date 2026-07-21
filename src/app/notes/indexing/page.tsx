"use client";

import { Zap, Lightbulb } from "lucide-react";
import { indexingExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function IndexingPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Indexing & Performance</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Single, compound, and partial indexes with explain execution statistics</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { title: "Single Index", desc: "Index on one field" },
          { title: "Compound Index", desc: "Index on multiple fields" },
          { title: "Partial Index", desc: "Index on subset of documents" },
        ].map(t => (
          <div key={t.title} className="card p-4 text-center">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center mx-auto mb-2.5">
              <Zap size={15} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white">{t.title}</h3>
            <p className="text-xs text-[#5a5a5a] mt-0.5">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {indexingExamples.map((ex, i) => (
          <div key={i} className="card p-6">
            <h3 className="text-[15px] font-semibold text-white mb-4">{ex.title}</h3>
            <CodeBlock code={ex.code} />
            {ex.explanation && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-white/[0.06] border border-white/[0.15] mt-4">
                <Lightbulb size={15} className="text-gray-300 shrink-0 mt-0.5" />
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{ex.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



