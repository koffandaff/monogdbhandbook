"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Code2, Lightbulb } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface MCQProps {
  id: number;
  question: string;
  options: string[];
  answer: string;
  reason: string;
  code?: string;
  simpleCode?: string;
  explanation?: string;
  selected: number | null;
  showResult: boolean;
  onSelect: (idx: number) => void;
}

export default function MCQCard({ id, question, options, answer, reason, code, simpleCode, explanation, selected, showResult, onSelect }: MCQProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isCorrect = selected !== null && options[selected] === answer;

  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/[0.10] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          {id}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-white font-medium leading-relaxed mb-4">{question}</p>

          <div className="space-y-2">
            {options.map((opt, i) => {
              const isSelected = selected === i;
              const isAns = opt === answer;
              let borderColor = "border-[rgba(255,255,255,0.08)] hover:border-[#333333]";
              let bgColor = "bg-transparent hover:bg-white/[0.02]";
              let textColor = "text-[#8a8a8a]";
              if (isSelected && showResult && isAns) {
                borderColor = "border-green-500";
                bgColor = "bg-green-500/8";
                textColor = "text-green-400";
              } else if (isSelected && showResult && !isAns) {
                borderColor = "border-red-500";
                bgColor = "bg-red-500/8";
                textColor = "text-red-400";
              } else if (showResult && isAns) {
                borderColor = "border-green-500";
                bgColor = "bg-green-500/8";
                textColor = "text-green-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${borderColor} ${bgColor} ${textColor}`}
                >
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium shrink-0 border ${
                    showResult
                      ? isAns
                        ? "border-green-500 bg-green-500/20 text-green-400"
                        : isSelected
                          ? "border-red-500 bg-red-500/20 text-red-400"
                          : "border-[rgba(255,255,255,0.08)] text-[#5a5a5a]"
                      : "border-[rgba(255,255,255,0.08)] text-[#5a5a5a]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showResult && isAns && <CheckCircle2 size={15} className="text-green-400 shrink-0" />}
                  {isSelected && showResult && !isAns && <XCircle size={15} className="text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-4">
              <div className={`flex items-start gap-3 p-4 rounded-lg border ${
                isCorrect ? "bg-green-500/8 border-green-500/20" : "bg-red-500/8 border-red-500/20"
              }`}>
                {isCorrect
                  ? <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                  : <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                }
                <div>
                  <p className={`text-sm font-semibold mb-0.5 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  <p className="text-sm text-[#8a8a8a]">
                    <span className="text-white font-medium">Answer: {answer}</span>
                    <br />
                    {reason}
                  </p>
                </div>
              </div>

              {(simpleCode || code) && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="mt-3 flex items-center gap-1.5 text-sm text-white hover:text-gray-300 transition-colors"
                >
                  <Code2 size={14} />
                  {showDetails ? "Hide code" : "Show code"}
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
          )}
        </div>
      </div>
    </div>
  );
}

