"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { regexExamples } from "@/data/notes";
import CodeBlock from "@/components/CodeBlock";

const sampleData = [
  [1, "Amit", 18, "Ahmedabad", 75, "A"], [2, "Ankit123", 20, "Surat", 82, "A"],
  [3, "Riya", 21, "Rajkot", 68, "B"], [4, "TestUser", 22, "Vadodara", 90, "A"],
  [5, "UserTest", 19, "Ahmedabad", 71, "B"], [6, "Testing", 20, "Surat", 84, "A"],
  [7, "ABC123", 18, "Rajkot", 65, "B"], [8, "123ABC", 23, "Ahmedabad", 88, "A"],
  [9, "98765", 22, "Bhavnagar", 59, "C"], [10, "Anjali", 20, "Surat", 80, "A"],
];

export default function RegexPage() {
  const [search, setSearch] = useState("");
  const filtered = regexExamples.filter(ex =>
    ex.title.toLowerCase().includes(search.toLowerCase()) || ex.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Regex Pattern Matching</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Regular expression queries using the $regex operator in MongoDB</p>
          </div>
        </div>
        <div className="relative max-w-sm mt-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter patterns..." className="input pl-9" />
        </div>
      </div>

      <div className="card p-5 mb-8">
        <h3 className="text-sm font-semibold text-white mb-3">Sample Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>{["_id", "name", "age", "city", "marks", "status"].map(h => <th key={h} className="px-3 py-2 text-left text-[#5a5a5a] font-semibold uppercase tracking-wider border-b border-[rgba(255,255,255,0.08)]">{h}</th>)}</tr>
            </thead>
            <tbody>
              {sampleData.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, j) => <td key={j} className="px-3 py-2 text-[#8a8a8a] border-b border-[rgba(255,255,255,0.08)]">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((ex, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-6 h-6 rounded bg-white/[0.08] text-gray-300 text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
              <h3 className="text-sm font-medium text-white">{ex.title}</h3>
            </div>
            <CodeBlock code={ex.code} compact />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#5a5a5a]">No matching patterns</div>
        )}
      </div>
    </div>
  );
}



