"use client";

import { Shield } from "lucide-react";
import { validationExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function SchemaValidationPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Schema Validation</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Mongoose built-in validators and custom validation rules</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
        {[
          ["required", "Field mandatory"], ["unique", "No duplicates"], ["default", "Default value"],
          ["min/max", "Number range"], ["enum", "Allowed values"], ["match", "Regex pattern"],
          ["trim", "Remove whitespace"], ["uppercase", "To uppercase"], ["lowercase", "To lowercase"], ["validate", "Custom function"],
        ].map(([v, desc]) => (
          <div key={v} className="card p-3 text-center">
            <code className="text-xs text-gray-300 font-mono font-medium block">{v}</code>
            <p className="text-[11px] text-[#5a5a5a] mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {validationExamples.map((ex, i) => (
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



