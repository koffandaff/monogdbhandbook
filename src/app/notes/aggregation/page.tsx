"use client";

import { BarChart3 } from "lucide-react";
import { aggregationExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function AggregationPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Aggregation Pipeline</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Powerful data processing pipeline with $match, $group, $sort, $project</p>
          </div>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <h3 className="text-sm font-semibold text-white mb-3">Pipeline Stages</h3>
        <div className="flex flex-wrap gap-2">
          {["$match", "$group", "$sort", "$project", "$limit", "$skip", "$avg", "$sum"].map(s => (
            <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.08] text-white font-mono">{s}</span>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {aggregationExamples.map((ex, i) => (
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


