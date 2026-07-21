"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play, Trash2, Database, Table, Terminal, Server,
  Plus, FileJson, Loader2, Maximize2, Minimize2
} from "lucide-react";

interface QueryResult {
  type: "success" | "error" | "info";
  content: string;
  data?: unknown;
  timestamp: string;
}
interface Collection { name: string; documents: Record<string, unknown>[]; }
interface Database { name: string; collections: Collection[]; }

export default function MongoShell() {
  const [activeDb, setActiveDb] = useState("myNewDatabase");
  const [databases, setDatabases] = useState<Database[]>([{ name: "myNewDatabase", collections: [] }]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QueryResult[]>([
    { type: "info", content: `MongoDB Shell 8.0 — Connected to Atlas`, timestamp: new Date().toLocaleTimeString() },
    { type: "info", content: "Type `help` for available commands", timestamp: new Date().toLocaleTimeString() },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [newDbName, setNewDbName] = useState("");
  const [showCollModal, setShowCollModal] = useState(false);
  const [newCollName, setNewCollName] = useState("");
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newDocJson, setNewDocJson] = useState("{\n  \n}");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const resultsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { resultsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [results]);

  const addResult = (type: QueryResult["type"], content: string, data?: unknown) => {
    setResults(prev => [...prev, { type, content, data, timestamp: new Date().toLocaleTimeString() }]);
  };

  const getDb = (name?: string): Database => {
    const dbName = name || activeDb;
    let db = databases.find(d => d.name === dbName);
    if (!db) { db = { name: dbName, collections: [] }; setDatabases(prev => [...prev, db!]); }
    return db;
  };

  const insertSampleData = (collName: string) => {
    const sampleDocs = [
      { _id: 1, name: "ABC", city: "Ahmedabad", age: 18, marks: 75 },
      { _id: 2, name: "XYZ", city: "Surat", age: 20, marks: 82 },
      { _id: 3, name: "PQR", city: "Ahmedabad", age: 19, marks: 68 },
      { _id: 4, name: "ABC", city: "Rajkot", age: 21, marks: 90 },
      { _id: 5, name: "XYZ", city: "Ahmedabad", age: 20, marks: 85 },
      { _id: 6, name: "LMN", city: "Surat", age: 18, marks: 60 },
    ];
    setDatabases(prev => prev.map(db => {
      if (db.name === activeDb) {
        const existing = db.collections.find(c => c.name === collName);
        if (existing) return { ...db, collections: db.collections.map(c => c.name === collName ? { ...c, documents: [...c.documents, ...sampleDocs] } : c) };
        return { ...db, collections: [...db.collections, { name: collName, documents: sampleDocs }] };
      }
      return db;
    }));
  };

  const executeQuery = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
    const lower = trimmed.toLowerCase();

    if (lower === "show dbs" || lower === "show databases") {
      addResult("success", `Databases (${databases.length}):`);
      databases.forEach(db => addResult("info", `  ${db.name}`));
      return;
    }
    if (lower.startsWith("show collections")) {
      const db = getDb();
      if (db.collections.length === 0) { addResult("info", "No collections in this database."); return; }
      addResult("success", `Collections in ${activeDb}:`);
      db.collections.forEach(c => addResult("info", `  ${c.name} (${c.documents.length} docs)`));
      return;
    }
    if (lower.startsWith("use ")) {
      const dbName = trimmed.substring(4).trim();
      if (dbName) {
        if (!databases.find(d => d.name === dbName)) setDatabases(prev => [...prev, { name: dbName, collections: [] }]);
        setActiveDb(dbName);
        addResult("success", `Switched to db: ${dbName}`);
      }
      return;
    }

    const collMatch = trimmed.match(/db\.(\w+)\./);
    const collName = collMatch ? collMatch[1] : null;

    if (lower.includes(".insertone(") || lower.includes(".insertmany(")) {
      if (collName) {
        const db = getDb();
        if (!db.collections.find(c => c.name === collName)) {
          setDatabases(prev => prev.map(d => d.name === activeDb ? { ...d, collections: [...d.collections, { name: collName, documents: [] }] } : d));
        }
        addResult("success", `Inserted into ${collName}`);
        if (lower.includes("sample")) { insertSampleData(collName); addResult("info", "Sample data inserted"); }
        else {
          setDatabases(prev => prev.map(d => d.name === activeDb ? { ...d, collections: d.collections.map(c => c.name === collName ? { ...c, documents: [...c.documents, { _id: Date.now(), name: "Test", inserted: true }] } : c) } : d));
        }
      }
      return;
    }
    if (lower.includes(".find(") || lower.includes(".findone(")) {
      if (collName) {
        const coll = getDb().collections.find(c => c.name === collName);
        if (coll && coll.documents.length > 0) {
          addResult("success", `Found ${coll.documents.length} document(s) in ${collName}:`);
          coll.documents.forEach(d => addResult("info", `  ${JSON.stringify(d)}`));
        } else {
          addResult("info", `Collection '${collName}' is empty. Use db.${collName}.insertMany(sample)`);
        }
      }
      return;
    }
    if (lower.includes(".deleteone(") || lower.includes(".deletemany(")) {
      if (collName) {
        setDatabases(prev => prev.map(d => d.name === activeDb ? { ...d, collections: d.collections.map(c => c.name === collName ? { ...c, documents: lower.includes("deletemany") ? [] : c.documents.slice(1) } : c) } : d));
        addResult("success", `Deleted from ${collName}`);
      }
      return;
    }
    if (lower.includes(".createindex(") || lower.includes("createindex")) {
      if (collName) addResult("success", `Index created on ${collName}!`);
      else addResult("success", "Index created!");
      return;
    }
    if (lower.includes("getindexes")) {
      if (collName) { addResult("success", `Indexes on ${collName}:`); addResult("info", "  { v: 2, key: { _id: 1 }, name: '_id_' }"); }
      return;
    }
    if (lower.includes(".aggregate(") || lower.includes("aggregate")) {
      addResult("success", "Aggregation pipeline result:");
      addResult("info", "  [{ _id: 'Electronics', totalAmount: 132000, avgAmount: 33000 }]");
      addResult("info", "  [{ _id: 'Fashion', totalAmount: 9500, avgAmount: 3167 }]");
      return;
    }
    if (lower.includes("explain")) {
      addResult("success", "Execution Stats:");
      addResult("info", "  stage: IXSCAN | nReturned: 2 | docsExamined: 2 | time: 0ms");
      return;
    }
    if (lower.includes(".count") || lower.includes("countdocuments")) {
      if (collName) {
        const count = getDb().collections.find(c => c.name === collName)?.documents.length || 0;
        addResult("success", `Count: ${count}`);
      }
      return;
    }
    if (lower.includes(".sort(")) {
      if (collName) {
        const coll = getDb().collections.find(c => c.name === collName);
        if (coll && coll.documents.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const sorted = [...coll.documents].sort((a: any, b: any) => (b.age || 0) - (a.age || 0));
          addResult("success", "Sorted (age desc):");
          sorted.forEach(d => addResult("info", `  ${JSON.stringify(d)}`));
        }
      }
      return;
    }
    if (lower === "help" || lower === "?") {
      addResult("success", "Available commands:");
      ["show dbs", "use <db>", "show collections", "db.collection.find()", "db.collection.insertMany(sample)", "db.collection.aggregate([...])", "db.collection.createIndex({field:1})", "db.collection.getIndexes()", "db.collection.explain()", "db.collection.countDocuments()", "db.collection.deleteMany({})", "db.collection.sort({age:-1})"].forEach(c => addResult("info", `  ${c}`));
      return;
    }
    addResult("error", `Command not recognized: ${trimmed}`);
    addResult("info", "Type `help` for available commands.");
  };

  const runQuery = () => {
    if (!query.trim()) return;
    setIsRunning(true);
    addResult("info", `> ${query}`);
    executeQuery(query);
    setQuery("");
    setIsRunning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runQuery(); }
    if (e.key === "ArrowUp") { e.preventDefault(); if (historyIdx < history.length - 1) { const i = historyIdx + 1; setHistoryIdx(i); setQuery(history[i]); } }
    if (e.key === "ArrowDown") { e.preventDefault(); if (historyIdx > 0) { const i = historyIdx - 1; setHistoryIdx(i); setQuery(history[i]); } else { setHistoryIdx(-1); setQuery(""); } }
  };

  const createDatabase = () => {
    if (!newDbName.trim()) return;
    if (!databases.find(d => d.name === newDbName)) setDatabases(prev => [...prev, { name: newDbName, collections: [] }]);
    setActiveDb(newDbName);
    setNewDbName("");
    setShowDbModal(false);
    addResult("success", `Database '${newDbName}' created`);
  };
  const createCollection = () => {
    if (!newCollName.trim()) return;
    setDatabases(prev => prev.map(db => db.name === activeDb ? { ...db, collections: db.collections.find(c => c.name === newCollName) ? db.collections : [...db.collections, { name: newCollName, documents: [] }] } : db));
    setNewCollName("");
    setShowCollModal(false);
    addResult("success", `Collection '${newCollName}' created`);
  };
  const addDocument = () => {
    try {
      const doc = JSON.parse(newDocJson);
      if (!selectedCollection) return;
      setDatabases(prev => prev.map(db => db.name === activeDb ? { ...db, collections: db.collections.map(c => c.name === selectedCollection ? { ...c, documents: [...c.documents, { ...doc, _id: Date.now() }] } : c) } : db));
      setNewDocJson("{\n  \n}");
      setShowAddDoc(false);
      addResult("success", "Document added");
    } catch { addResult("error", "Invalid JSON"); }
  };
  const clearResults = () => setResults([{ type: "info", content: "Console cleared", timestamp: new Date().toLocaleTimeString() }]);

  const currentDb = databases.find(d => d.name === activeDb);
  const currentColl = currentDb?.collections.find(c => c.name === selectedCollection);

  return (
    <div className="flex gap-4 h-[calc(100vh-12rem)] min-h-[500px]">
      {/* Left sidebar - databases & collections */}
      <div className={`${sidebarCollapsed ? "w-12" : "w-56"} card flex flex-col shrink-0 transition-all duration-200 overflow-hidden`}>
        <div className="px-3 py-3 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <Server size={14} className="text-green-400 shrink-0" />
              <span className="text-sm font-medium text-white truncate">Cluster0</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 rounded-md hover:bg-white/[0.06] text-[#5a5a5a] hover:text-[#8a8a8a] transition-all ml-auto">
            {sidebarCollapsed ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="px-3 pt-3 pb-1 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5a5a5a]">Databases</span>
                <button onClick={() => setShowDbModal(true)} className="p-1 rounded-md hover:bg-white/[0.06] text-[#5a5a5a] hover:text-[#8a8a8a] transition-all">
                  <Plus size={13} />
                </button>
              </div>
              <div className="space-y-0.5 max-h-[160px] overflow-y-auto">
                {databases.map(db => (
                  <button key={db.name} onClick={() => setActiveDb(db.name)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all ${
                      activeDb === db.name ? "bg-white/[0.08] text-white" : "text-[#8a8a8a] hover:text-white hover:bg-white/[0.06]"
                    }`}>
                    <Database size={12} />
                    <span className="truncate">{db.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5a5a5a]">{activeDb}</span>
                <button onClick={() => setShowCollModal(true)} className="p-1 rounded-md hover:bg-white/[0.06] text-[#5a5a5a] hover:text-[#8a8a8a] transition-all">
                  <Plus size={13} />
                </button>
              </div>
              <div className="space-y-0.5">
                {currentDb?.collections.map(coll => (
                  <button key={coll.name} onClick={() => setSelectedCollection(coll.name)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all ${
                      selectedCollection === coll.name ? "bg-green-500/10 text-green-400" : "text-[#8a8a8a] hover:text-white hover:bg-white/[0.06]"
                    }`}>
                    <Table size={12} />
                    <span className="flex-1 text-left truncate">{coll.name}</span>
                    <span className="text-[10px] text-[#5a5a5a]">{coll.documents.length}</span>
                  </button>
                ))}
                {(!currentDb || currentDb.collections.length === 0) && (
                  <p className="text-xs text-[#5a5a5a] px-2 py-2">No collections</p>
                )}
              </div>
            </div>

            <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.08)]">
              <button onClick={clearResults} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-xs text-[#5a5a5a] hover:text-[#8a8a8a] hover:bg-white/[0.06] transition-all">
                <Trash2 size={12} />
                Clear Console
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right panel - collection data + shell */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {selectedCollection && currentColl && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2.5">
                <FileJson size={15} className="text-green-400" />
                <span className="text-sm font-medium text-white">{selectedCollection}</span>
                <span className="text-xs text-[#5a5a5a]">({currentColl.documents.length} documents)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => insertSampleData(selectedCollection)} className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-white/[0.08] text-white hover:bg-white/[0.06] transition-all">+ Sample Data</button>
                <button onClick={() => setShowAddDoc(true)} className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all">+ Document</button>
                <button onClick={() => { setDatabases(prev => prev.map(db => db.name === activeDb ? { ...db, collections: db.collections.filter(c => c.name !== selectedCollection) } : db)); setSelectedCollection(null); }}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">Drop</button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
              {currentColl.documents.length > 0 ? (
                <table className="w-full text-xs">
                  <thead>
                    <tr>{Object.keys(currentColl.documents[0]).map(k => <th key={k} className="px-4 py-2.5 text-left text-[#5a5a5a] font-semibold uppercase tracking-wider border-b border-[rgba(255,255,255,0.08)] bg-white/[0.02]">{k}</th>)}</tr>
                  </thead>
                  <tbody>
                    {currentColl.documents.map((doc, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">{Object.values(doc).map((val, j) => <td key={j} className="px-4 py-2 text-[#8a8a8a] border-b border-[rgba(255,255,255,0.08)] font-mono">{typeof val === 'object' ? JSON.stringify(val) : String(val)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <Table size={32} className="mx-auto text-[#5a5a5a] mb-2" />
                  <p className="text-sm text-[#5a5a5a]">Collection is empty</p>
                  <button onClick={() => insertSampleData(selectedCollection)} className="mt-2 text-xs text-white hover:text-gray-300">Insert sample data</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shell */}
        <div className="card flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2.5">
              <Terminal size={15} className="text-white" />
              <span className="text-sm font-medium text-white">MongoDB Shell</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.08] text-white">mongosh 8.0</span>
            </div>
            <span className="text-xs text-[#5a5a5a]">{activeDb}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed space-y-1 bg-[#0d1117]">
            {results.map((r, i) => (
              <div key={i} className={`${
                r.type === "success" ? "text-green-400" :
                r.type === "error" ? "text-red-400" :
                "text-[#5a5a5a]"
              }`}>
                <span className="text-[10px] text-[#5a5a5a] opacity-50 mr-2">{r.timestamp}</span>
                {r.content.split('\n').map((line, j) => <span key={j}>{j > 0 && <br/>}{line}</span>)}
              </div>
            ))}
            <div ref={resultsEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#080808] border border-[rgba(255,255,255,0.08)] focus-within:border-white/[0.20] transition-all">
                <span className="text-green-400 text-sm font-mono shrink-0">&gt;</span>
                <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="db.collection.find()  or  help"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#5a5a5a] font-mono" />
              </div>
              <button onClick={runQuery} disabled={isRunning}
                className="px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-all disabled:opacity-50 flex items-center gap-2 shrink-0">
                {isRunning ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowDbModal(false)}>
          <div className="card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-1">Create Database</h3>
            <p className="text-sm text-[#8a8a8a] mb-4">Add a new database to the cluster.</p>
            <input type="text" value={newDbName} onChange={e => setNewDbName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createDatabase()}
              placeholder="myDatabase" className="input mb-4" autoFocus />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDbModal(false)} className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.06] transition-all">Cancel</button>
              <button onClick={createDatabase} className="btn-primary">Create</button>
            </div>
          </div>
        </div>
      )}

      {showCollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCollModal(false)}>
          <div className="card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-1">Create Collection</h3>
            <p className="text-sm text-[#8a8a8a] mb-1">in <span className="text-white font-medium">{activeDb}</span></p>
            <input type="text" value={newCollName} onChange={e => setNewCollName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createCollection()}
              placeholder="collectionName" className="input mb-4" autoFocus />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowCollModal(false)} className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.06] transition-all">Cancel</button>
              <button onClick={createCollection} className="btn-primary">Create</button>
            </div>
          </div>
        </div>
      )}

      {showAddDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddDoc(false)}>
          <div className="card p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-1">Add Document</h3>
            <p className="text-sm text-[#8a8a8a] mb-4">
              to <span className="text-green-400 font-medium">{selectedCollection}</span> in <span className="text-white font-medium">{activeDb}</span>
            </p>
            <textarea value={newDocJson} onChange={e => setNewDocJson(e.target.value)} rows={8}
              className="input font-mono text-xs mb-4 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAddDoc(false)} className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.06] transition-all">Cancel</button>
              <button onClick={addDocument} className="btn-primary">Add Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


