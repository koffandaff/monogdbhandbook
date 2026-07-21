"use client";

import { BrainCircuit, GraduationCap, ArrowRight, LayoutGrid, Clock } from "lucide-react";
import Link from "next/link";

export default function MCQPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MCQ Practice</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Chapter-wise multiple choice questions with detailed solutions</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link href="/mcq/ch9">
          <div className="card p-6 group h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.10] flex items-center justify-center shadow-lg">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="badge badge-white">32 Questions</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1.5">Chapter 9: MongoDB</h2>
            <p className="text-sm text-[#8a8a8a] mb-4 flex-1">CRUD, Aggregation, Indexing, Schema Validation, $regex</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["CRUD", "Aggregation", "Indexing", "Schema", "$regex"].map(t => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-white/[0.06] border border-[rgba(255,255,255,0.12)] text-[#8a8a8a]">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3 text-xs text-[#5a5a5a]">
                <span className="flex items-center gap-1"><LayoutGrid size={12} /> 2 modes</span>
                <span className="flex items-center gap-1"><Clock size={12} /> ~30 min</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-white">
                Start <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/mcq/ch10">
          <div className="card p-6 group h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center shadow-lg">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="badge badge-gray">44 Questions</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1.5">Chapter 10: Mongoose</h2>
            <p className="text-sm text-[#8a8a8a] mb-4 flex-1">Schema, Model, CRUD, Validation, Population, Middleware</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Schema", "Model", "CRUD", "Validation", "Population"].map(t => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-white/[0.06] border border-[rgba(255,255,255,0.12)] text-[#8a8a8a]">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3 text-xs text-[#5a5a5a]">
                <span className="flex items-center gap-1"><LayoutGrid size={12} /> 2 modes</span>
                <span className="flex items-center gap-1"><Clock size={12} /> ~40 min</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                Start <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}


