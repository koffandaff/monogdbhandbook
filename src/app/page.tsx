"use client";

import { BookOpen, BrainCircuit, PlayCircle, ArrowRight, Terminal, Database, BarChart3, Search, Zap, Server, Shield, Globe, Flame, Target, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: BookOpen, label: "Topics Completed", value: "12 / 25", color: "text-white" },
  { icon: BrainCircuit, label: "Questions Solved", value: "218", color: "text-gray-300" },
  { icon: Target, label: "Accuracy", value: "87%", color: "text-green-400" },
  { icon: Flame, label: "Streak", value: "14 Days", color: "text-amber-400" },
];

const features = [
  { icon: BookOpen, label: "Study Notes", desc: "8 chapters · 45 sections · Last updated today", href: "/notes", badge: "2h read" },
  { icon: BrainCircuit, label: "MCQ Practice", desc: "76 questions · 2 chapters · Solutions included", href: "/mcq", badge: "76 Qs" },
  { icon: PlayCircle, label: "MongoDB Shell", desc: "Live Atlas connection · Query runner · History", href: "/playground", badge: "Live" },
];

const topics = [
  { icon: Terminal, label: "MongoDB Commands", href: "/notes/commands", count: "42" },
  { icon: Database, label: "CRUD Operations", href: "/notes/crud", count: "18" },
  { icon: BarChart3, label: "Aggregation", href: "/notes/aggregation", count: "24" },
  { icon: Search, label: "Regex Patterns", href: "/notes/regex", count: "12" },
  { icon: Zap, label: "Indexing", href: "/notes/indexing", count: "15" },
  { icon: Server, label: "Mongoose ODM", href: "/notes/mongoose", count: "20" },
  { icon: Shield, label: "Schema Validation", href: "/notes/schema-validation", count: "10" },
  { icon: Globe, label: "Express + MongoDB", href: "/notes/connectivity", count: "16" },
];

const hours = new Date().getHours();
const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">{greeting}, Dhruvil <span className="wave inline-block">👋</span></h1>
        <p className="text-[#8a8a8a] mt-1">Continue your Full Stack Development - 2 journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <s.icon size={18} className={s.color} />
              <span className="text-xs text-[#5a5a5a] font-medium uppercase tracking-wider">{s.label}</span>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="card p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp size={18} className="text-white" />
            <h2 className="text-sm font-semibold text-white">Learning Progress</h2>
          </div>
          <span className="text-xs text-[#5a5a5a]">Updated today</span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-[#8a8a8a]">MongoDB</span>
              <span className="text-xs text-[#5a5a5a]">62%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-white to-gray-400 transition-all" style={{ width: "62%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-[#8a8a8a]">Express.js</span>
              <span className="text-xs text-[#5a5a5a]">45%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-gray-300 to-gray-500 transition-all" style={{ width: "45%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-[#8a8a8a]">Node.js</span>
              <span className="text-xs text-[#5a5a5a]">78%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-gray-300 to-gray-500 transition-all" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <div className="card p-6 h-full group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.10] flex items-center justify-center shadow-lg">
                  <f.icon size={20} className="text-white" />
                </div>
                <span className="badge badge-white">{f.badge}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1.5 group-hover:text-white transition-colors">{f.label}</h3>
              <p className="text-sm text-[#8a8a8a] leading-relaxed flex-1">{f.desc}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-white mt-4">
                Continue <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Access Topics */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-0.5 h-5 bg-white rounded-full" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Access Topics</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topics.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="card p-4 group h-full flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center shrink-0">
                  <t.icon size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors truncate">{t.label}</h3>
                  <span className="text-[11px] text-[#5a5a5a]">{t.count} sections</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.10] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-white/[0.06]">
          <Database size={26} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Ready to Practice?</h2>
        <p className="text-sm text-[#8a8a8a] mb-6 max-w-md mx-auto">
          Open the MongoDB Shell playground to run real queries, create collections, and test your knowledge interactively.
        </p>
        <Link href="/playground">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/[0.80] transition-colors shadow-lg shadow-white/[0.06]">
            <Database size={16} />
            Open MongoDB Playground
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>
    </div>
  );
}



