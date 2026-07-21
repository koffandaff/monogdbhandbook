"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Play, Database, Table, Terminal, Server, Plus, FileJson,
  ChevronDown, ChevronRight, X, Lightbulb, Copy,
  Check, History, HelpCircle,
  Filter, Code, Clock, Hash,
  ListTree, PanelLeftClose, PanelLeft,
} from "lucide-react";
import { ShellLine, AutocompleteSuggestion } from "@/lib/shellTypes";
import { MockDB } from "@/lib/mockdb";
import { getAutocomplete } from "@/lib/autocomplete";
import { getLearningTip } from "@/lib/learningEngine";

interface TabItem {
  id: string;
  label: string;
  type: "mongosh" | "query" | "aggregation";
  lines: ShellLine[];
  input: string;
}

let tabCounter = 0;
function newTab(type: TabItem["type"] = "mongosh"): TabItem {
  tabCounter++;
  const label = type === "mongosh" ? "mongosh" : type === "query" ? `Query ${tabCounter}` : `Agg ${tabCounter}`;
  return { id: `tab-${tabCounter}`, label, type, lines: [], input: "" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatJSON(val: any): string {
  try {
    return JSON.stringify(val, null, 2);
  } catch {
    return String(val);
  }
}

function formatTimestamp(d: Date): string {
  return d.toLocaleTimeString();
}

const INIT_LINES: ShellLine[] = [
  { type: "system", text: `MongoDB Playground v8.0 — Connected to Atlas`, ts: formatTimestamp(new Date()) },
  { type: "system", text: "Type `help` for available commands  |  `seed <dataset>` for sample data", ts: formatTimestamp(new Date()) },
];

export default function PlaygroundShell() {
  const [db] = useState(() => new MockDB());
  const [tabs, setTabs] = useState<TabItem[]>([{ ...newTab("mongosh"), lines: [...INIT_LINES] }]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 768;
    return true;
  });
  const [sidebarTab, setSidebarTab] = useState<"explorer" | "history" | "help">("explorer");
  const [expandedDbs, setExpandedDbs] = useState<Set<string>>(new Set());
  const [expandedColls, setExpandedColls] = useState<Set<string>>(new Set());
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autoCompleteIdx, setAutoCompleteIdx] = useState(0);
  const [autoSuggestions, setAutoSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; dbName: string; collName: string } | null>(null);
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);
  const [qbCollection, setQbCollection] = useState("");
  const [qbFilters, setQbFilters] = useState<{ field: string; op: string; value: string; conj: string }[]>([]);
  const [showLearning, setShowLearning] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [activeTab?.lines]);

  useEffect(() => {
    const handleClick = () => { setShowAutocomplete(false); setContextMenu(null); };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const updateTab = useCallback((updater: (t: TabItem) => TabItem) => {
    setTabs((prev) => prev.map((t) => (t.id === activeTabId ? updater(t) : t)));
  }, [activeTabId]);

  const addLine = useCallback((lines: ShellLine[]) => {
    updateTab((t) => ({ ...t, lines: [...t.lines, ...lines] }));
  }, [updateTab]);

  const handleContextAction = useCallback((cmd: string) => {
    if (!contextMenu) return;
    updateTab((t) => ({ ...t, input: cmd }));
    inputRef.current?.focus();
    setContextMenu(null);
  }, [contextMenu, updateTab]);

  const contextMenuItems = useMemo(() => {
    if (!contextMenu) return [];
    return [
      { label: "View Documents", cmd: `db.${contextMenu.collName}.find().limit(5)` },
      { label: "Insert Sample", cmd: `db.${contextMenu.collName}.insertMany(sample)` },
      { label: "Drop Collection", cmd: `db.${contextMenu.collName}.drop()` },
      { label: "Get Indexes", cmd: `db.${contextMenu.collName}.getIndexes()` },
      { label: "Copy Name", cmd: null },
    ];
  }, [contextMenu]);

  const execute = useCallback(() => {
    const input = activeTab.input.trim();
    if (!input) return;
    updateTab((t) => ({ ...t, input: "", lines: [...t.lines, { type: "info", text: `> ${input}`, ts: formatTimestamp(new Date()) }] }));
    const results = db.execute(input);
    if (results.length === 1 && results[0].text === "CLEAR") {
      updateTab((t) => ({ ...t, lines: [] }));
    } else {
      addLine(results);
    }
    if (showLearning) {
      const tip = getLearningTip(input);
      if (tip) {
        addLine([
          { type: "system", text: `\u2139\ufe0f ${tip.explanation}`, ts: formatTimestamp(new Date()) },
          { type: "info", text: `   Complexity: ${tip.complexity}`, ts: formatTimestamp(new Date()) },
          ...tip.bestPractices.map((bp) => ({ type: "info" as const, text: `   \u2714 ${bp}`, ts: formatTimestamp(new Date()) })),
          ...tip.warnings.map((w) => ({ type: "info" as const, text: `   \u26a0\ufe0f ${w}`, ts: formatTimestamp(new Date()) })),
        ]);
      }
    }
    setShowAutocomplete(false);
  }, [activeTab, db, addLine, updateTab, showLearning]);

  const handleInputChange = (val: string) => {
    updateTab((t) => ({ ...t, input: val }));
    const collNames = db.dbs.flatMap((d) => d.collections.map((c) => c.name));
    const suggestions = getAutocomplete(val, collNames);
    setAutoSuggestions(suggestions);
    setAutoCompleteIdx(0);
    setShowAutocomplete(suggestions.length > 0 && val.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showAutocomplete && autoSuggestions.length > 0) {
      if (e.key === "ArrowDown") { e.preventDefault(); setAutoCompleteIdx((p) => Math.min(p + 1, autoSuggestions.length - 1)); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); setAutoCompleteIdx((p) => Math.max(p - 1, 0)); return; }
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const sel = autoSuggestions[autoCompleteIdx];
        if (sel) {
          updateTab((t) => ({ ...t, input: sel.text }));
          setShowAutocomplete(false);
        }
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); execute(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = db.commandHistory;
      if (h.length > 0) {
        const cur = activeTab.input;
        const idx = h.indexOf(cur);
        const next = idx < h.length - 1 ? h[idx + 1] : h[0];
        updateTab((t) => ({ ...t, input: next }));
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      updateTab((t) => ({ ...t, input: "" }));
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      updateTab((t) => ({ ...t, lines: [] }));
      return;
    }
  };

  const switchTab = (id: string) => {
    setActiveTabId(id);
    setShowAutocomplete(false);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs((prev) => {
      const filtered = prev.filter((t) => t.id !== id);
      if (filtered.length === 0) return [{ ...newTab("mongosh"), lines: [...INIT_LINES] }];
      if (id === activeTabId) setActiveTabId(filtered[0].id);
      return filtered;
    });
  };

  const addNewTab = (type: TabItem["type"] = "mongosh") => {
    const t = newTab(type);
    if (type === "mongosh") t.lines = [...INIT_LINES];
    setTabs((prev) => [...prev, t]);
    setActiveTabId(t.id);
  };

  const copyResult = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleDb = (name: string) => {
    setExpandedDbs((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const toggleColl = (name: string) => {
    setExpandedColls((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const handleContextMenu = (e: React.MouseEvent, dbName: string, collName: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, dbName, collName });
  };

  // Query Builder
  const qbAddFilter = () => {
    setQbFilters((prev) => [...prev, { field: "", op: "$eq", value: "", conj: "AND" }]);
  };

  const qbRemoveFilter = (i: number) => {
    setQbFilters((prev) => prev.filter((_, idx) => idx !== i));
  };

  const qbUpdateFilter = (i: number, key: string, val: string) => {
    setQbFilters((prev) => prev.map((f, idx) => (idx === i ? { ...f, [key]: val } : f)));
  };

  const qbGenerate = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (qbFilters.length === 1) {
      const f = qbFilters[0];
      if (f.op === "$eq") filter[f.field] = f.value;
      else filter[f.field] = { [f.op]: isNaN(Number(f.value)) ? f.value : Number(f.value) };
    } else if (qbFilters.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const groups: { op: string; conditions: Record<string, any>[] }[] = qbFilters.reduce((acc: { op: string; conditions: Record<string, any>[] }[], f) => {
        const cond = f.op === "$eq" ? f.value : { [f.op]: isNaN(Number(f.value)) ? f.value : Number(f.value) };
        if (acc.length === 0) acc.push({ op: f.conj || "AND", conditions: [{ [f.field]: cond }] });
        else {
          const last = acc[acc.length - 1];
          if (last.op === f.conj) last.conditions.push({ [f.field]: cond });
          else acc.push({ op: f.conj || "AND", conditions: [{ [f.field]: cond }] });
        }
        return acc;
      }, []);
      if (groups.length === 1 && groups[0].op === "AND") {
        groups[0].conditions.forEach((c) => Object.assign(filter, c));
      } else {
        const parts = groups.map((g) => g.conditions.length === 1 ? g.conditions[0] : { [`$${g.op.toLowerCase()}`]: g.conditions });
        if (parts.length === 1) Object.assign(filter, parts[0]);
        else filter["$and"] = parts;
      }
    }
    const q = `db.${qbCollection}.find(${formatJSON(filter)})`;
    updateTab((t) => ({ ...t, input: q }));
    setShowQueryBuilder(false);
    setQbFilters([]);
  };

  const activeTabInput = activeTab?.input || "";

  const renderLine = (line: ShellLine, i: number) => {
    const key = `${activeTabId}-line-${i}`;
    const colorMap: Record<string, string> = {
      success: "text-green-400",
      error: "text-red-400",
      info: "text-[#8a8a8a]",
      result: "text-white",
      system: "text-white/[0.5]",
    };
    const isResult = line.type === "result" || (line.data && typeof line.data === "object");
    const isExpandable = isResult && line.text.length > 80;

    return (
      <div key={key} className={`group relative ${colorMap[line.type] || "text-[#8a8a8a]"} font-mono text-[13px] leading-relaxed py-0.5`}>
        <span className="text-[10px] text-[#5a5a5a] opacity-40 mr-2 select-none">{line.ts}</span>
        {line.text}
        {isExpandable && (
          <button onClick={() => copyResult(line.text, key)}
            className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 rounded bg-white/[0.06] hover:bg-white/[0.1] transition-all">
            {copiedId === key ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-[#8a8a8a]" />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#080808]">
      {/* Top Toolbar */}
      <div className="flex items-center h-10 bg-[#0a0a0a] border-b border-[rgba(255,255,255,0.06)] shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-full flex items-center justify-center text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all">
          {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeft size={15} />}
        </button>

        {/* Tabs */}
        <div className="flex items-center flex-1 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <div key={tab.id} onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 h-full text-xs font-medium cursor-pointer border-r border-[rgba(255,255,255,0.06)] transition-all whitespace-nowrap ${
                tab.id === activeTabId ? "bg-[#080808] text-white border-b-2 border-b-white" : "text-[#5a5a5a] hover:text-white hover:bg-white/[0.02]"
              }`}>
              {tab.type === "mongosh" ? <Terminal size={13} /> : tab.type === "query" ? <Code size={13} /> : <Filter size={13} />}
              {tab.label}
              {tabs.length > 1 && (
                <button onClick={(e) => closeTab(tab.id, e)}
                  className="ml-1 p-0.5 rounded hover:bg-white/[0.08] text-[#5a5a5a] hover:text-white">
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
          <button onClick={() => addNewTab("mongosh")}
            className="px-2 h-full text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all">
            <Plus size={14} />
          </button>
        </div>

        <div className="flex items-center gap-1 px-1 md:px-2">
          <button onClick={() => setShowLearning(!showLearning)}
            className={`px-1.5 md:px-2 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
              showLearning ? "bg-white/[0.08] text-white" : "text-[#5a5a5a] hover:text-white"
            }`}>
            <Lightbulb size={12} />
            <span className="hidden md:inline">Learn</span>
          </button>
          <button onClick={() => setShowQueryBuilder(true)}
            className="px-1.5 md:px-2 py-1 rounded text-[11px] font-medium text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1">
            <Filter size={12} />
            <span className="hidden md:inline">Builder</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        {sidebarOpen && (
          <>
            {/* Mobile overlay backdrop */}
            <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="fixed md:static inset-y-0 left-0 z-50 w-[260px] md:w-[240px] shrink-0 border-r border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] flex flex-col md:flex">
            {/* Sidebar tabs */}
            <div className="flex border-b border-[rgba(255,255,255,0.06)]">
              {[
                { id: "explorer" as const, icon: Database, label: "Explorer" },
                { id: "history" as const, icon: History, label: "History" },
                { id: "help" as const, icon: HelpCircle, label: "Help" },
              ].map((s) => (
                <button key={s.id} onClick={() => setSidebarTab(s.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium transition-all ${
                    sidebarTab === s.id ? "text-white bg-[#080808] border-b-2 border-b-white" : "text-[#5a5a5a] hover:text-white hover:bg-white/[0.02]"
                  }`}>
                  <s.icon size={13} />
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {/* Database Explorer */}
              {sidebarTab === "explorer" && (
                <div className="p-2 space-y-0.5">
                  <div className="flex items-center gap-2 px-2 py-2 text-xs text-[#5a5a5a] border-b border-[rgba(255,255,255,0.06)] mb-1">
                    <Server size={13} className="text-green-400" />
                    <span className="font-medium text-white text-[13px]">Cluster0</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-auto" />
                  </div>
                  {db.dbs.map((database) => {
                    const isExpanded = expandedDbs.has(database.name);
                    return (
                      <div key={database.name}>
                        <button onClick={() => toggleDb(database.name)}
                          className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs hover:bg-white/[0.04] transition-all group">
                          {isExpanded ? <ChevronDown size={12} className="text-[#5a5a5a]" /> : <ChevronRight size={12} className="text-[#5a5a5a]" />}
                          <Database size={13} className="text-white/70" />
                          <span className="text-white text-[13px] font-medium">{database.name}</span>
                          <span className="ml-auto text-[10px] text-[#5a5a5a]">{database.collections.length} coll</span>
                        </button>
                        {isExpanded && database.collections.map((coll) => {
                          const collIsExpanded = expandedColls.has(`${database.name}:${coll.name}`);
                          return (
                            <div key={coll.name} className="ml-4">
                              <div onContextMenu={(e) => handleContextMenu(e, database.name, coll.name)}>
                                <button onClick={() => toggleColl(`${database.name}:${coll.name}`)}
                                  className="w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs hover:bg-white/[0.04] transition-all group">
                                  {collIsExpanded ? <ChevronDown size={10} className="text-[#5a5a5a]" /> : <ChevronRight size={10} className="text-[#5a5a5a]" />}
                                  <Table size={12} className="text-white/60" />
                                  <span className="text-[#8a8a8a] truncate">{coll.name}</span>
                                  <span className="ml-auto text-[10px] text-[#5a5a5a]">{coll.documents.length}</span>
                                </button>
                              </div>
                              {collIsExpanded && (
                                <div className="ml-5 space-y-0.5 mt-0.5">
                                  <button onClick={() => { updateTab((t) => ({ ...t, input: `db.${coll.name}.find().limit(5)` })); inputRef.current?.focus(); }}
                                    className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all">
                                    <FileJson size={11} /> Documents
                                  </button>
                                  <button onClick={() => { updateTab((t) => ({ ...t, input: `db.${coll.name}.getIndexes()` })); inputRef.current?.focus(); }}
                                    className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all">
                                    <ListTree size={11} /> Indexes
                                  </button>
                                  <button onClick={() => { updateTab((t) => ({ ...t, input: `db.${coll.name}.stats()` })); inputRef.current?.focus(); }}
                                    className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-[#5a5a5a] hover:text-white hover:bg-white/[0.04] transition-all">
                                    <Hash size={11} /> Stats
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  {db.dbs.length === 0 && (
                    <div className="text-center py-8 text-xs text-[#5a5a5a]">
                      No databases yet<br />
                      Type <span className="text-white font-mono">seed students</span> to get started
                    </div>
                  )}
                </div>
              )}

              {/* History */}
              {sidebarTab === "history" && (
                <div className="p-2">
                  <div className="flex items-center justify-between px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a5a] border-b border-[rgba(255,255,255,0.06)] mb-1">
                    <span>Recent Commands</span>
                    <span className="text-[10px] font-normal text-[#5a5a5a]">{db.commandHistory.length}</span>
                  </div>
                  {db.commandHistory.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#5a5a5a]">
                      No commands yet
                    </div>
                  ) : (
                    db.commandHistory.slice().reverse().slice(0, 50).map((cmd, i) => (
                      <button key={i} onClick={() => { updateTab((t) => ({ ...t, input: cmd })); inputRef.current?.focus(); }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-all font-mono text-left">
                        <Clock size={11} className="shrink-0 text-[#5a5a5a]" />
                        <span className="truncate">{cmd}</span>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Help */}
              {sidebarTab === "help" && (
                <div className="p-2">
                  <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a5a] border-b border-[rgba(255,255,255,0.06)] mb-1">
                    Quick Help
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { label: "seed students", desc: "Load student dataset" },
                      { label: "seed ecommerce", desc: "Load e-commerce dataset" },
                      { label: "seed bookstore", desc: "Load bookstore dataset" },
                      { label: "seed socialmedia", desc: "Load social media dataset" },
                      { label: "seed banking", desc: "Load banking dataset" },
                    ].map((s) => (
                      <button key={s.label} onClick={() => { updateTab((t) => ({ ...t, input: s.label })); inputRef.current?.focus(); }}
                        className="w-full flex flex-col px-2 py-1.5 rounded text-xs hover:bg-white/[0.04] transition-all">
                        <span className="text-white font-mono">{s.label}</span>
                        <span className="text-[10px] text-[#5a5a5a]">{s.desc}</span>
                      </button>
                    ))}
                    <div className="border-t border-[rgba(255,255,255,0.06)] my-2" />
                    {[
                      { label: "help find", desc: "Detailed find() help" },
                      { label: "help aggregate", desc: "Aggregation pipeline guide" },
                      { label: "help insertOne", desc: "Insert document help" },
                      { label: "help createIndex", desc: "Index creation guide" },
                    ].map((s) => (
                      <button key={s.label} onClick={() => { updateTab((t) => ({ ...t, input: s.label })); inputRef.current?.focus(); }}
                        className="w-full flex flex-col px-2 py-1.5 rounded text-xs hover:bg-white/[0.04] transition-all">
                        <span className="text-white font-mono">{s.label}</span>
                        <span className="text-[10px] text-[#5a5a5a]">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar bottom status */}
            <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.06)] text-[10px] text-[#5a5a5a] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Connected — {db.activeDb}
            </div>
          </div>
        </>
        )}

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          {/* Output */}
          <div ref={outputRef} className="flex-1 overflow-y-auto p-2 md:p-4 space-y-0.5 scrollbar-thin bg-[#080808]">
            {activeTab.lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-xs text-[#5a5a5a] gap-2">
                <Terminal size={32} className="opacity-30" />
                <p>Console cleared. Start typing below.</p>
              </div>
            ) : (
              activeTab.lines.map((line, i) => renderLine(line, i))
            )}
          </div>

          {/* Input area */}
          <div className="px-2 md:px-4 py-2 md:py-3 border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] relative">
            {showAutocomplete && autoSuggestions.length > 0 && (
              <div ref={autoRef}
                className="absolute bottom-full left-2 md:left-4 right-2 md:right-4 mb-1 max-h-[200px] md:max-h-[280px] overflow-y-auto rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#111] shadow-2xl z-50">
                {autoSuggestions.map((s, i) => (
                  <button key={i} onClick={() => { updateTab((t) => ({ ...t, input: s.text })); setShowAutocomplete(false); inputRef.current?.focus(); }}
                    onMouseEnter={() => setAutoCompleteIdx(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-all ${
                      i === autoCompleteIdx ? "bg-white/[0.08] text-white" : "text-[#8a8a8a] hover:bg-white/[0.04]"
                    }`}>
                    <span className={`text-[9px] md:text-[10px] font-medium px-1 md:px-1.5 py-0.5 rounded shrink-0 ${
                      s.category === "Database" ? "bg-blue-500/10 text-blue-400" :
                      s.category === "CRUD" ? "bg-green-500/10 text-green-400" :
                      s.category === "Aggregation" ? "bg-amber-500/10 text-amber-400" :
                      s.category === "Indexes" ? "bg-purple-500/10 text-purple-400" :
                      s.category === "Cursor" ? "bg-cyan-500/10 text-cyan-400" :
                      "bg-white/[0.06] text-white"
                    }`}>{s.category}</span>
                    <code className="font-mono text-white text-[11px] md:text-xs">{s.text}</code>
                    <span className="ml-auto text-[#5a5a5a] hidden md:block">{s.description}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#080808] border border-[rgba(255,255,255,0.08)] focus-within:border-white/[0.20] transition-all">
                <span className="text-green-400 text-sm font-mono shrink-0">{'>'}</span>
                <input ref={inputRef} type="text" value={activeTabInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeTab.type === "mongosh" ? "db.collection.find()  or  help  or  seed students" : "Write your query..."}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#5a5a5a] font-mono" />
              </div>
              <button onClick={execute}
                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-all flex items-center gap-2 shrink-0">
                <Play size={14} />
                Run
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div className="fixed z-[100] bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg shadow-2xl py-1 min-w-[180px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}>
          {contextMenuItems.map((item) => (
            <button key={item.label} onClick={() => {
              if (item.label === "Copy Name") {
                navigator.clipboard.writeText(contextMenu.collName);
                setContextMenu(null);
              } else if (item.cmd) {
                handleContextAction(item.cmd);
              }
            }}
              className="w-full text-left px-3 py-1.5 text-xs text-[#8a8a8a] hover:text-white hover:bg-white/[0.06] transition-all">
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Query Builder Modal */}
      {showQueryBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowQueryBuilder(false)}>
          <div className="card p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Filter size={18} className="text-white" />
                <h3 className="text-lg font-semibold text-white">Query Builder</h3>
              </div>
              <button onClick={() => setShowQueryBuilder(false)} className="p-1 rounded hover:bg-white/[0.06] text-[#5a5a5a] hover:text-white transition">
                <X size={16} />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#8a8a8a] mb-1.5 block">Collection</label>
              <select value={qbCollection} onChange={(e) => setQbCollection(e.target.value)}
                className="input text-sm">
                <option value="">Select collection...</option>
                {db.dbs.flatMap((d) => d.collections).map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {qbFilters.map((f, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                {i > 0 && (
                  <select value={f.conj} onChange={(e) => qbUpdateFilter(i, "conj", e.target.value)}
                    className="w-16 text-[11px] px-1 py-1.5 rounded border border-[rgba(255,255,255,0.08)] bg-transparent text-[#8a8a8a]">
                    <option>AND</option>
                    <option>OR</option>
                  </select>
                )}
                {i === 0 && <span className="w-16 text-[11px] text-[#5a5a5a]">Where</span>}
                <input type="text" value={f.field} onChange={(e) => qbUpdateFilter(i, "field", e.target.value)}
                  placeholder="field" className="flex-1 input text-sm" />
                <select value={f.op} onChange={(e) => qbUpdateFilter(i, "op", e.target.value)}
                  className="w-20 text-[11px] px-1 py-1.5 rounded border border-[rgba(255,255,255,0.08)] bg-transparent text-[#8a8a8a]">
                  <option value="$eq">=</option>
                  <option value="$gt">&gt;</option>
                  <option value="$gte">&gt;=</option>
                  <option value="$lt">&lt;</option>
                  <option value="$lte">&lt;=</option>
                  <option value="$ne">!=</option>
                </select>
                <input type="text" value={f.value} onChange={(e) => qbUpdateFilter(i, "value", e.target.value)}
                  placeholder="value" className="w-24 input text-sm" />
                <button onClick={() => qbRemoveFilter(i)}
                  className="p-1.5 rounded hover:bg-white/[0.06] text-[#5a5a5a] hover:text-red-400 transition">
                  <X size={13} />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-3 mt-3">
              <button onClick={qbAddFilter}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-xs text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-all">
                <Plus size={12} /> Add Filter
              </button>
              <button onClick={qbGenerate}
                className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/[0.80] transition-all flex items-center gap-1.5">
                <Code size={12} /> Generate Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
