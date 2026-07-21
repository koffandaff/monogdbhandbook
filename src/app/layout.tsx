import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "FSD-2 Interactive Learning Hub",
  description: "Master MongoDB, Express, Node.js through interactive learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="lg:pl-[260px]">
          <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#080808]/80 border-b border-[rgba(255,255,255,0.06)]">
             <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
              <SearchBar />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-green-400">Connected</span>
                </div>
              </div>
            </div>
          </div>
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
