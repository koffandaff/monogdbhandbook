"use client";

import { Search, Command } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const results = [
  { label: "MongoDB Commands", href: "/notes/commands", type: "Study Notes" },
  { label: "CRUD Operations", href: "/notes/crud", type: "Study Notes" },
  { label: "Aggregation Pipeline", href: "/notes/aggregation", type: "Study Notes" },
  { label: "Regex Patterns", href: "/notes/regex", type: "Study Notes" },
  { label: "Indexing", href: "/notes/indexing", type: "Study Notes" },
  { label: "Mongoose ODM", href: "/notes/mongoose", type: "Study Notes" },
  { label: "Schema Validation", href: "/notes/schema-validation", type: "Study Notes" },
  { label: "Express + MongoDB", href: "/notes/connectivity", type: "Study Notes" },
  { label: "Ch 9 - MongoDB MCQs", href: "/mcq/ch9", type: "MCQ" },
  { label: "Ch 10 - Mongoose MCQs", href: "/mcq/ch10", type: "MCQ" },
  { label: "MongoDB Playground", href: "/playground", type: "Tool" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query ? results.filter(r =>
    r.label.toLowerCase().includes(query.toLowerCase())
  ) : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search anything..."
          className="w-full h-9 pl-9 pr-10 rounded-lg bg-white/[0.04] border border-[rgba(255,255,255,0.08)] text-sm text-[#f0f0f0] placeholder:text-[#5a5a5a] outline-none focus:border-white focus:bg-white/[0.06] transition-all"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-medium text-[#5a5a5a]">
          <Command size={10} />K
        </div>
      </div>

      {open && query && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0d0d0d] shadow-xl shadow-black/40 overflow-hidden animate-fade">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[#5a5a5a]">No results found</div>
          ) : (
            filtered.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium">{r.label}</div>
                  <div className="text-[11px] text-[#5a5a5a]">{r.type}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

