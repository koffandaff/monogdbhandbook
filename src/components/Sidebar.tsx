"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, BookOpen, BrainCircuit, Database, Terminal, BarChart3,
  Search, Zap, Server, Shield, Globe, ChevronDown, GraduationCap,
  PlayCircle, Menu, X, Bookmark, Clock, Download, TrendingUp, Settings,
  type LucideIcon,
} from "lucide-react";

interface NavItemBase {
  icon: LucideIcon;
  label: string;
  href: string;
}
interface NavItemWithChildren extends NavItemBase {
  children: { icon: LucideIcon; label: string; href: string }[];
}
interface NavItemDisabled extends NavItemBase {
  disabled: true;
}
type NavItem = NavItemBase | NavItemWithChildren | NavItemDisabled;
interface Section { label: string; items: NavItem[]; }

const sections: Section[] = [
  {
    label: "DATABASE", items: [
      { icon: Home, label: "Dashboard", href: "/" },
    ]
  },
  {
    label: "LEARNING", items: [
      { icon: BookOpen, label: "Study Notes", href: "/notes",
        children: [
          { icon: Terminal, label: "MongoDB Commands", href: "/notes/commands" },
          { icon: Database, label: "CRUD Operations", href: "/notes/crud" },
          { icon: BarChart3, label: "Aggregation", href: "/notes/aggregation" },
          { icon: Search, label: "Regex Patterns", href: "/notes/regex" },
          { icon: Zap, label: "Indexing", href: "/notes/indexing" },
          { icon: Server, label: "Mongoose ODM", href: "/notes/mongoose" },
          { icon: Shield, label: "Schema Validation", href: "/notes/schema-validation" },
          { icon: Globe, label: "Express + MongoDB", href: "/notes/connectivity" },
        ] },
      { icon: BrainCircuit, label: "MCQ Practice", href: "/mcq",
        children: [
          { icon: GraduationCap, label: "Ch 9 - MongoDB", href: "/mcq/ch9" },
          { icon: GraduationCap, label: "Ch 10 - Mongoose", href: "/mcq/ch10" },
        ] },
      { icon: PlayCircle, label: "MongoDB Playground", href: "/playground" },
    ]
  },
  {
    label: "TOOLS", items: [
      { icon: Bookmark, label: "Bookmarks", href: "#", disabled: true },
      { icon: Clock, label: "History", href: "#", disabled: true },
      { icon: Download, label: "Downloads", href: "#", disabled: true },
    ]
  },
  {
    label: "ACCOUNT", items: [
      { icon: TrendingUp, label: "Progress", href: "#", disabled: true },
      { icon: Settings, label: "Settings", href: "#", disabled: true },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string[]>(["learning"]);
  const [mobile, setMobile] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobile(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobile]);

  const active = (h: string) => pathname === h;
  const parentActive = (h: string, c?: { href: string }[]): boolean => active(h) || (c?.some(x => active(x.href)) ?? false);

  return (
    <>
      <button onClick={() => setMobile(true)}
        className="fixed top-3 left-3 z-50 lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0d0d0d] text-[#8a8a8a] hover:text-white transition">
        <Menu size={18} />
      </button>

      {/* Desktop */}
      <aside className="fixed top-0 left-0 z-30 hidden lg:flex flex-col h-full w-[260px] bg-[#0d0d0d] border-r border-[rgba(255,255,255,0.06)]">
        <SidebarInner sections={sections} open={open} setOpen={setOpen} active={active} parentActive={parentActive} mobile={false} setMobile={setMobile} />
      </aside>

      {/* Mobile */}
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobile(false)} />
          <aside className="relative w-[280px] h-full bg-[#0d0d0d] border-r border-[rgba(255,255,255,0.06)] flex flex-col animate-slide-right">
            <div className="flex items-center justify-between px-4 h-14 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.10] flex items-center justify-center">
                  <Database size={15} className="text-white" />
                </div>
                <span className="font-semibold text-[15px] text-white">FSD-2 Hub</span>
              </div>
              <button onClick={() => setMobile(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8a8a8a] hover:text-white hover:bg-white/[0.06] transition">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3">
              <SidebarInner sections={sections} open={open} setOpen={setOpen} active={active} parentActive={parentActive} mobile={true} setMobile={setMobile} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

interface SidebarInnerProps {
  sections: Section[];
  open: string[];
  setOpen: React.Dispatch<React.SetStateAction<string[]>>;
  active: (h: string) => boolean;
  parentActive: (h: string, c?: { href: string }[]) => boolean;
  mobile: boolean;
  setMobile: (v: boolean) => void;
}

function SidebarInner({ sections, open, setOpen, active, parentActive, mobile, setMobile }: SidebarInnerProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 h-14 flex items-center border-b border-[rgba(255,255,255,0.06)] shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => mobile && setMobile(false)}>
          <div className="w-8 h-8 rounded-lg bg-white/[0.10] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-white/[0.06] transition-shadow">
            <Database size={15} className="text-white" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-white tracking-tight">FSD-2 Hub</div>
            <div className="text-[10px] text-[#8a8a8a] -mt-0.5">Interactive Learning</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin space-y-5">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="text-[10px] font-semibold tracking-wider text-[#8a8a8a] uppercase px-3 mb-1.5">{section.label}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = "children" in item && item.children.length > 0;
                const sectionKey = section.label.toLowerCase();
                const expanded = open.includes(sectionKey);

                if ("disabled" in item && item.disabled) {
                  return (
                    <div key={item.label}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#5a5a5a] cursor-not-allowed">
                      <Icon size={16} className="text-[#5a5a5a]/50" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-[10px] text-[#5a5a5a]/50">Soon</span>
                    </div>
                  );
                }

                if (hasChildren) {
                  const itemWithChildren = item as NavItemWithChildren;
                  return (
                    <div key={item.label}>
                      <button onClick={() => setOpen((prev: string[]) => prev.includes(sectionKey) ? prev.filter((l: string) => l !== sectionKey) : [...prev, sectionKey])}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          parentActive(itemWithChildren.href, itemWithChildren.children) ? "text-white bg-white/[0.08] font-medium" : "text-[#8a8a8a] hover:text-white hover:bg-white/[0.06]"
                        }`}>
                        <Icon size={16} className={parentActive(itemWithChildren.href, itemWithChildren.children) ? "text-white" : "text-[#5a5a5a]"} />
                        <span className="flex-1 text-left">{itemWithChildren.label}</span>
                        <ChevronDown size={13}
                          className={`text-[#5a5a5a] transition-transform duration-200 ${expanded ? "" : "-rotate-90"}`} />
                      </button>
                      {expanded && (
                        <div className="mt-0.5 space-y-0.5 pl-6">
                          {itemWithChildren.children.map((child) => (
                            <NavItem key={child.href} href={child.href} icon={child.icon} label={child.label} active={active} mobile={mobile} setMobile={setMobile} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={item.label}>
                    <NavItem href={item.href} icon={Icon} label={item.label} active={active} mobile={mobile} setMobile={setMobile} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.06)] shrink-0">
        <div className="rounded-lg bg-white/[0.03] border border-[rgba(255,255,255,0.06)] px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-white leading-tight">Mock Engine Active</div>
              <div className="text-[11px] text-[#8a8a8a] truncate">In-Memory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active: (h: string) => boolean;
  mobile: boolean;
  setMobile: (v: boolean) => void;
}

function NavItem({ href, icon: Icon, label, active, mobile, setMobile }: NavItemProps) {
  const isActive = active(href);
  return (
    <Link href={href} onClick={() => mobile && setMobile(false)}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
        isActive ? "text-white bg-white/[0.08] font-medium" : "text-[#8a8a8a] hover:text-white hover:bg-white/[0.06]"
      }`}>
      <Icon size={16} className={isActive ? "text-white" : "text-[#5a5a5a]"} />
      <span>{label}</span>
    </Link>
  );
}

