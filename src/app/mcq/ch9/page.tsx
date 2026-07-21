"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, BookOpen, Search, Bookmark, BookmarkCheck, CheckCircle2, XCircle, ChevronDown, ChevronUp, Code2, Lightbulb, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { mcqCh9, descriptiveCh9 } from "@/data/mcq-ch9";
import CodeBlock from "@/components/CodeBlock";

export default function Ch9Page() {
  const [mode, setMode] = useState<"interactive" | "solution">("interactive");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mcqCh9.length).fill(null));
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("mcq-ch9-bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id: number) => {
    const next = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem("mcq-ch9-bookmarks", JSON.stringify(next));
  };

  const filteredMcq = useMemo(() => {
    if (!search) return mcqCh9;
    return mcqCh9.filter(m => 
      m.question.toLowerCase().includes(search.toLowerCase()) ||
      m.options.some(o => o.toLowerCase().includes(search.toLowerCase())) ||
      m.reason.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const mcq = mcqCh9[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (mcq.options[idx] === mcq.answer) setScore(s => s + 1);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < mcqCh9.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / mcqCh9.length) * 100);
    return (
      <div className="max-w-[640px] mx-auto px-4 md:px-8 pt-20 pb-16 text-center">
        <div className="card p-10">
          <div className="w-16 h-16 rounded-xl bg-white/[0.10] flex items-center justify-center mx-auto mb-5">
            <BookOpen size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Practice Complete!</h2>
          <div className="text-6xl font-bold text-white mb-1">{score}<span className="text-[#5a5a5a]">/{mcqCh9.length}</span></div>
          <p className="text-lg text-[#8a8a8a] mb-6">{pct}% correct</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-gradient-to-r from-white to-gray-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button onClick={() => { setCurrent(0); setSelected(null); setShowResult(false); setScore(0); setFinished(false); setAnswers(new Array(mcqCh9.length).fill(null)); }} className="px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-colors">
            Restart Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <Link href="/mcq" className="inline-flex items-center gap-1 text-sm text-[#5a5a5a] hover:text-[#8a8a8a] transition-colors mb-1.5">
            <ChevronLeft size={14} /> Back to MCQs
          </Link>
          <h1 className="text-2xl font-bold text-white">Chapter 9: MongoDB</h1>
          <p className="text-sm text-[#8a8a8a] mt-0.5">46 Questions · CRUD, Aggregation, Indexing, Schema Validation</p>
        </div>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex rounded-lg border border-[rgba(255,255,255,0.08)] overflow-hidden">
          <button onClick={() => setMode("interactive")} className={`px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${mode === "interactive" ? "bg-white text-black" : "text-[#8a8a8a] hover:text-white"}`}>
            <LayoutGrid size={14} />Interactive
          </button>
          <button onClick={() => setMode("solution")} className={`px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${mode === "solution" ? "bg-white text-black" : "text-[#8a8a8a] hover:text-white"}`}>
            <List size={14} />Solution Book
          </button>
        </div>
        {mode === "solution" && (
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-[#5a5a5a] outline-none focus:border-white/[0.20] transition-colors" />
          </div>
        )}
        {mode === "interactive" && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#5a5a5a]">{current + 1} / {mcqCh9.length}</span>
            <div className="w-24 h-1.5 rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-gradient-to-r from-white to-gray-400 transition-all" style={{ width: `${((current + 1) / mcqCh9.length) * 100}%` }} />
            </div>
          </div>
        )}
      </div>

      {mode === "interactive" ? (
        /* Interactive Mode */
        <div>
          <InteractiveCard
            id={mcq.id}
            question={mcq.question}
            options={mcq.options}
            answer={mcq.answer}
            reason={mcq.reason}
            code={mcq.code}
            simpleCode={mcq.simpleCode}
            explanation={mcq.explanation}
            selected={selected}
            showResult={showResult}
            onSelect={handleSelect}
            bookmarked={bookmarks.includes(mcq.id)}
            onToggleBookmark={() => toggleBookmark(mcq.id)}
            showDetails={showDetails === mcq.id}
            onToggleDetails={() => setShowDetails(showDetails === mcq.id ? null : mcq.id)}
          />
          {showResult && (
            <div className="flex justify-end mt-4">
              <button onClick={next} className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-colors">
                {current < mcqCh9.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Solution Book Mode */
        <>
          <div className="space-y-4">
            {filteredMcq.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#5a5a5a]">No questions match your search</p>
              </div>
            ) : filteredMcq.map((m) => (
              <SolutionCard
                key={m.id}
                id={m.id}
                question={m.question}
                options={m.options}
                answer={m.answer}
                reason={m.reason}
                code={m.code}
                simpleCode={m.simpleCode}
                explanation={m.explanation}
                bookmarked={bookmarks.includes(m.id)}
                onToggleBookmark={() => toggleBookmark(m.id)}
                showDetails={showDetails === m.id}
                onToggleDetails={() => setShowDetails(showDetails === m.id ? null : m.id)}
              />
            ))}
          </div>

          {/* Descriptive Questions */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-0.5 h-5 bg-white rounded-full" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Descriptive / Coding Questions</h2>
            </div>
            <div className="space-y-3">
              {descriptiveCh9.map((d) => {
                const isExpanded = expandedDesc === d.id;
                return (
                  <div key={d.id} className="card p-5">
                    <button onClick={() => setExpandedDesc(isExpanded ? null : d.id)} className="w-full text-left">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                          {d.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[15px] text-white font-medium leading-relaxed mb-2">{d.question}</p>
                            {d.solution && (
                              <span className="shrink-0 mt-1 text-[#5a5a5a]">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-amber-400 font-medium">[{d.marks} marks]</span>
                        </div>
                      </div>
                    </button>
                    {isExpanded && d.solution && (
                      <div className="mt-4 space-y-3">
                        <CodeBlock code={d.solution} />
                        {d.explanation && (
                          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                            <Lightbulb size={15} className="text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-[#8a8a8a]">{d.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface InteractiveCardProps {
  id: number; question: string; options: string[]; answer: string; reason: string;
  code?: string; simpleCode?: string; explanation?: string;
  selected: number | null; showResult: boolean; onSelect: (i: number) => void;
  bookmarked: boolean; onToggleBookmark: () => void;
  showDetails: boolean; onToggleDetails: () => void;
}

function InteractiveCard({ id, question, options, answer, reason, code, simpleCode, explanation, selected, showResult, onSelect, bookmarked, onToggleBookmark, showDetails, onToggleDetails }: InteractiveCardProps) {
  const isCorrect = selected !== null && options[selected] === answer;
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/[0.10] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          {id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-4">
            <p className="text-[15px] text-white font-medium leading-relaxed">{question}</p>
            <button onClick={onToggleBookmark} className="shrink-0 mt-0.5 text-[#5a5a5a] hover:text-amber-400 transition-colors">
              {bookmarked ? <BookmarkCheck size={16} className="text-amber-400" /> : <Bookmark size={16} />}
            </button>
          </div>
          <div className="space-y-2">
            {options.map((opt: string, i: number) => {
              const isSelected = selected === i;
              const isAns = opt === answer;
              let cls = "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/[0.02] text-[#8a8a8a]";
              if (isSelected && showResult && isAns) cls = "border-green-500 bg-green-500/8 text-green-400";
              else if (isSelected && showResult && !isAns) cls = "border-red-500 bg-red-500/8 text-red-400";
              else if (showResult && isAns) cls = "border-green-500 bg-green-500/8 text-green-400";
              return (
                <button key={i} onClick={() => onSelect(i)} disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${cls}`}>
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium shrink-0 border ${
                    showResult && isAns ? "border-green-500 bg-green-500/20 text-green-400" :
                    showResult && isSelected && !isAns ? "border-red-500 bg-red-500/20 text-red-400" :
                    "border-[rgba(255,255,255,0.08)] text-[#5a5a5a]"
                  }`}>{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {showResult && isAns && <CheckCircle2 size={15} className="text-green-400 shrink-0" />}
                  {isSelected && showResult && !isAns && <XCircle size={15} className="text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="mt-4 space-y-3">
              <div className={`flex items-start gap-3 p-4 rounded-lg border ${isCorrect ? "bg-green-500/8 border-green-500/20" : "bg-red-500/8 border-red-500/20"}`}>
                {isCorrect ? <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" /> : <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />}
                <div>
                  <p className={`text-sm font-semibold mb-0.5 ${isCorrect ? "text-green-400" : "text-red-400"}`}>{isCorrect ? "Correct" : "Incorrect"}</p>
                  <p className="text-sm text-[#8a8a8a]"><span className="text-white font-medium">Answer: {answer}</span><br />{reason}</p>
                </div>
              </div>
              {(simpleCode || code) && (
                <button onClick={onToggleDetails} className="flex items-center gap-1.5 text-sm text-white hover:text-gray-300 transition-colors">
                  <Code2 size={14} />{showDetails ? "Hide code" : "Show code"}{showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              )}
              {showDetails && (
                <div className="space-y-3">
                  {simpleCode && <CodeBlock code={simpleCode} compact />}
                  {code && <CodeBlock code={code} />}
                  {explanation && (
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                      <Lightbulb size={15} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-[#8a8a8a]">{explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SolutionCardProps {
  id: number; question: string; options: string[]; answer: string; reason: string;
  code?: string; simpleCode?: string; explanation?: string;
  bookmarked: boolean; onToggleBookmark: () => void;
  showDetails: boolean; onToggleDetails: () => void;
}

function SolutionCard({ id, question, options, answer, reason, code, simpleCode, explanation, bookmarked, onToggleBookmark, showDetails, onToggleDetails }: SolutionCardProps) {
  return (
    <div className="card p-5" id={`q-${id}`}>
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          {id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <p className="text-[15px] text-white font-medium leading-relaxed">{question}</p>
            <button onClick={onToggleBookmark} className="shrink-0 mt-0.5 text-[#5a5a5a] hover:text-amber-400 transition-colors">
              {bookmarked ? <BookmarkCheck size={16} className="text-amber-400" /> : <Bookmark size={16} />}
            </button>
          </div>
          <div className="space-y-1.5 mb-3">
            {options.map((opt: string, i: number) => {
              const isAns = opt === answer;
              return (
                <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm ${isAns ? "border-green-500/30 bg-green-500/8" : "border-[rgba(255,255,255,0.06)] bg-transparent"}`}>
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium shrink-0 border ${isAns ? "border-green-500 bg-green-500/20 text-green-400" : "border-[rgba(255,255,255,0.08)] text-[#5a5a5a]"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`flex-1 ${isAns ? "text-green-400 font-medium" : "text-[#8a8a8a]"}`}>{opt}</span>
                  {isAns && <CheckCircle2 size={14} className="text-green-400 shrink-0" />}
                </div>
              );
            })}
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.08] border border-white/[0.15]">
            <Lightbulb size={14} className="text-white shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#8a8a8a]"><span className="text-white font-medium">Answer: {answer}</span> &mdash; {reason}</p>
            </div>
          </div>
          {(simpleCode || code) && (
            <button onClick={onToggleDetails} className="mt-2 flex items-center gap-1.5 text-sm text-white hover:text-gray-300 transition-colors">
              <Code2 size={14} />{showDetails ? "Hide code" : "Show code"}{showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
          {showDetails && (
            <div className="mt-3 space-y-3">
              {simpleCode && <CodeBlock code={simpleCode} compact />}
              {code && <CodeBlock code={code} />}
              {explanation && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                  <Lightbulb size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#8a8a8a]">{explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


