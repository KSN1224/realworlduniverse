"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Smartphone, FileText, Sun, Moon, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/archive", label: "전체 자료실" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-card border-b border-white/20 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white">
            R.E.A.L.
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Category quick links */}
        <div className="hidden md:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/archive?cat=World" className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <Globe size={12} className="text-emerald-500" /> 월드
          </Link>
          <Link href="/archive?cat=App" className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <Smartphone size={12} className="text-blue-500" /> 앱
          </Link>
          <Link href="/archive?cat=Docs" className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <FileText size={12} className="text-orange-500" /> 문서
          </Link>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="테마 전환"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.header>
  );
}
