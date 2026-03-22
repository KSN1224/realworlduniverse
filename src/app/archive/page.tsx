"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Smartphone, FileText, LayoutGrid, List, X } from "lucide-react";
import MaterialCard from "@/components/MaterialCard";
import rawMaterials from "@/data/materials.json";

const materials = Array.isArray(rawMaterials) ? rawMaterials : [];

const categories = [
  { value: "All", label: "전체", icon: null },
  { value: "World", label: "월드", icon: <Globe size={13} />, color: "text-emerald-600 dark:text-emerald-400", active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40" },
  { value: "App", label: "앱", icon: <Smartphone size={13} />, color: "text-blue-600 dark:text-blue-400", active: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/40" },
  { value: "Docs", label: "문서", icon: <FileText size={13} />, color: "text-orange-600 dark:text-orange-400", active: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/40" },
];

export default function ArchivePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchCat = activeCategory === "All" || m.category === activeCategory;
      const matchQuery =
        query.trim() === "" ||
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCategory]);

  const activeConfig = categories.find((c) => c.value === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
          전체 자료실
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          총 <span className="font-bold text-slate-700 dark:text-slate-300">{materials.length}</span>개의 자료가 있습니다.
        </p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="자료 제목 또는 설명 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-card border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeCategory === cat.value
                  ? (cat.active ?? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent")
                  : "glass-card border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-1 glass-card border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "card" ? "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white" : "text-slate-400 hover:text-slate-600"}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white" : "text-slate-400 hover:text-slate-600"}`}
          >
            <List size={16} />
          </button>
        </div>
      </motion.div>

      {/* Results count */}
      <div className="text-sm text-slate-400 dark:text-slate-500 mb-4">
        {filtered.length}개의 자료
        {query && (
          <span> — &ldquo;<span className="text-slate-600 dark:text-slate-300 font-medium">{query}</span>&rdquo; 검색 결과</span>
        )}
      </div>

      {/* Grid / List */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={`${viewMode}-${activeCategory}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={
              viewMode === "card"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "flex flex-col gap-3"
            }
          >
            {filtered.map((m, i) => (
              <MaterialCard key={m.id} material={m} index={i} variant={viewMode} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 text-slate-400 dark:text-slate-600"
          >
            <Search size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-semibold">검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 검색어나 카테고리를 시도해보세요.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
