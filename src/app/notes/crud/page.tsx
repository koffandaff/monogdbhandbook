"use client";

import { Database } from "lucide-react";
import { crudExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function CRUDPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <Database size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">CRUD Operations</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Insert, Find, Update, and Delete operations with practical examples</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {crudExamples.map((ex, i) => (
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


