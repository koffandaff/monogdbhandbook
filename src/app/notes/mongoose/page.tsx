"use client";

import { Server } from "lucide-react";
import { mongooseExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

export default function MongoosePage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <Server size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Mongoose ODM</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Elegant MongoDB object modeling for Node.js with Schema, Model, and CRUD</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { title: "Schema", desc: "Defines document structure, fields, data types, validation rules" },
          { title: "Model", desc: "Applies schema to documents, responsible for CRUD operations" },
          { title: "Document", desc: "Instance of a Model, maps to a MongoDB document" },
        ].map(k => (
          <div key={k.title} className="card p-4">
            <h4 className="text-sm font-semibold text-white mb-1">{k.title}</h4>
            <p className="text-xs text-[#5a5a5a] leading-relaxed">{k.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {mongooseExamples.map((ex, i) => (
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


