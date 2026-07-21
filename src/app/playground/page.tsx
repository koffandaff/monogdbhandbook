"use client";

import { PlayCircle, Info } from "lucide-react";
import PlaygroundShell from "@/components/PlaygroundShell";

export default function PlaygroundPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.10] flex items-center justify-center">
              <PlayCircle size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MongoDB Playground</h1>
              <p className="text-sm text-[#8a8a8a] mt-0.5">Interactive MongoDB IDE with full mongosh experience</p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.08] border border-white/[0.15] mt-4">
          <Info size={16} className="text-white shrink-0 mt-0.5" />
          <div className="text-sm text-[#8a8a8a]">
            <p className="mb-1.5 text-white font-medium">Get started quickly:</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono">
              <span className="text-white">help</span>
              <span className="text-white">seed students</span>
              <span className="text-white">seed ecommerce</span>
              <span className="text-white">db.students.find({'{age:{$gt:19}}'})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-16rem)]">
        <PlaygroundShell />
      </div>
    </div>
  );
}
