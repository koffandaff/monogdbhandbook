"use client";

import { BookOpen, Terminal, Database, BarChart3, Search, Zap, Server, Shield, Globe, CheckCircle2, Clock, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { topicChapters } from "@/data/notes";

const iconMap: Record<string, LucideIcon> = { Terminal, Database, BarChart3, Search, Zap, Server, Shield, Globe };

export default function NotesPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Study Notes</h1>
            <p className="text-sm text-[#8a8a8a] mt-0.5">Comprehensive notes covering all MongoDB and Node.js topics</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {topicChapters.map((topic) => {
          const Icon = iconMap[topic.icon] || BookOpen;
          return (
            <Link key={topic.id} href={`/notes/${topic.id}`}>
              <div className="card p-5 group h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.10] flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="badge badge-white">{topic.items} sections</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-white transition-colors">{topic.title}</h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed flex-1 mb-3">{topic.desc}</p>
                <div className="flex items-center gap-3 text-xs text-[#5a5a5a] mt-auto">
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-400" /> Updated</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> ~{Math.ceil(topic.items * 5)} min</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


