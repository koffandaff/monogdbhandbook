"use client";

import { Terminal, Search } from "lucide-react";
import { useState } from "react";
import { commands } from "@/data/commands";

export default function CommandsPage() {
  const [search, setSearch] = useState("");
  const filtered = commands.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const c = item.command.toLowerCase().includes(search.toLowerCase());
      const d = item.description.toLowerCase().includes(search.toLowerCase());
      const s = "syntax" in item ? String(item.syntax).toLowerCase().includes(search.toLowerCase()) : false;
      return c || d || s;
    })
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <Terminal size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MongoDB Commands</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Complete reference of all MongoDB shell commands and operators</p>
          </div>
        </div>
        <div className="relative max-w-sm mt-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search commands..." className="input pl-9" />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(cat => (
          <div key={cat.category} className="card overflow-hidden">
            <div className="px-5 py-3 bg-white/[0.02] border-b border-[rgba(255,255,255,0.08)]">
              <h2 className="text-sm font-semibold text-white">{cat.category}</h2>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.08)]">
              {cat.items.map((item, i) => (
                <div key={i} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <code className="text-sm text-gray-300 font-mono block mb-0.5">{item.command}</code>
                  <p className="text-sm text-[#8a8a8a]">{item.description}</p>
                  {"syntax" in item && (
                    <code className="text-xs text-[#5a5a5a] font-mono mt-1 block">{String((item as { syntax: string }).syntax)}</code>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



