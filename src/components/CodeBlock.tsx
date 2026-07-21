"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export default function CodeBlock({ code, language = "javascript", title, compact }: {
  code: string; language?: string; title?: string; compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] ${compact ? "" : ""}`}>
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-[rgba(255,255,255,0.08)]">
          <Terminal size={13} className="text-white" />
          <span className="text-xs text-[#8a8a8a] font-medium">{title}</span>
          <span className="ml-auto text-[10px] text-[#5a5a5a] uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative bg-[#0d1117]">
        <pre className={`overflow-x-auto text-sm leading-relaxed ${compact ? "p-3 !text-[11px]" : "p-4"}`}>
          <code className="text-[#e6edf3] font-mono">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-white/[0.06] border border-[rgba(255,255,255,0.08)] text-[#5a5a5a] hover:text-[#8a8a8a] hover:bg-white/[0.1] transition-all"
          aria-label="Copy code"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}

