"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Smartphone, FileText, X } from "lucide-react";
import MaterialCard from "@/components/MaterialCard";
import rawMaterials from "@/data/materials.json";

const materials = Array.isArray(rawMaterials) ? rawMaterials : [];

const categories = [
  {
    value: "All",
    label: "전체",
    icon: null,
    active: "bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent",
  },
  {
    value: "World",
    label: "월드",
    icon: <Globe size={13} />,
    active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  },
  {
    value: "App",
    label: "앱",
    icon: <Smartphone size={13} />,
    active: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/40",
  },
  {
    value: "Docs",
    label: "문서",
    icon: <FileText size={13} />,
    active: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/40",
  },
];

const columnDefs = [
  {
    cat: "World",
    label: "월드",
    icon: <Globe size={16} />,
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  {
    cat: "App",
    label: "앱",
    icon: <Smartphone size={16} />,
    color: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  {
    cat: "Docs",
    label: "문서",
    icon: <FileText size={16} />,
    color: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
];

function ArchiveContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "All";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    categories.some((c) => c.value === initialCat) ? initialCat : "All"
  );

  // 모바일: 필터링 후 id 내림차순 (최신순)
  const mobileFeed = useMemo(() => {
    const q = query.toLowerCase().trim();
    return [...materials]
      .filter((m) => {
        const matchCat = activeCategory === "All" || m.category === activeCategory;
        const matchQ =
          !q ||
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q);
        return matchCat && matchQ;
      })
      .sort((a, b) => b.id - a.id);
  }, [query, activeCategory]);

  // 데스크톱 All 뷰: 카테고리별 칼럼
  const desktopColumns = useMemo(() => {
    const q = query.toLowerCase().trim();
    return columnDefs.map((col) => ({
      ...col,
      items: materials.filter((m) => {
        const matchCat = m.category === col.cat;
        const matchQ =
          !q ||
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q);
        return matchCat && matchQ;
      }),
    }));
  }, [query]);

  // 데스크톱 필터 뷰
  const desktopFiltered = useMemo(() => {
    if (activeCategory === "All") return [];
    const q = query.toLowerCase().trim();
    return materials.filter((m) => {
      const matchCat = m.category === activeCategory;
      const matchQ =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* 헤더 */}
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
          총{" "}
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {materials.length}
          </span>
          개의 자료가 있습니다.
        </p>
      </motion.div>

      {/* 검색 + 필터 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        {/* 검색창 */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
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

        {/* 카테고리 필터 버튼 */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeCategory === cat.value
                  ? cat.active
                  : "glass-card border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── 모바일 피드 (md 미만에서만 표시) ── */}
      <div className="md:hidden">
        <div className="text-sm text-slate-400 dark:text-slate-500 mb-4">
          {mobileFeed.length}개의 자료
          {activeCategory === "All" && " · 최신순"}
          {query && (
            <span>
              {" "}
              —{" "}
              &ldquo;
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {query}
              </span>
              &rdquo; 검색 결과
            </span>
          )}
        </div>
        <AnimatePresence mode="wait">
          {mobileFeed.length > 0 ? (
            <motion.div
              key={`mobile-${activeCategory}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              {mobileFeed.map((m, i) => (
                <MaterialCard key={m.id} material={m} index={i} variant="list" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="mobile-empty"
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

      {/* ── 데스크톱 레이아웃 (md 이상에서만 표시) ── */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {activeCategory === "All" ? (
            /* 3열 카테고리 레이아웃 */
            <motion.div
              key="desktop-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-3 gap-6"
            >
              {desktopColumns.map((col) => (
                <div key={col.cat}>
                  {/* 칼럼 헤더 */}
                  <div
                    className={`flex items-center gap-2 mb-5 pb-3 border-b ${col.border}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${col.bg} flex items-center justify-center ${col.color}`}
                    >
                      {col.icon}
                    </div>
                    <div>
                      <h2 className={`font-bold text-sm ${col.color}`}>
                        {col.label}
                      </h2>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {col.items.length}개
                      </p>
                    </div>
                  </div>
                  {/* 칼럼 아이템 */}
                  {col.items.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {col.items.map((m, i) => (
                        <MaterialCard
                          key={m.id}
                          material={m}
                          index={i}
                          variant="card"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-300 dark:text-slate-600 text-sm">
                      자료 없음
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            /* 필터 적용 시 그리드 */
            <motion.div
              key={`desktop-${activeCategory}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-sm text-slate-400 dark:text-slate-500 mb-4">
                {desktopFiltered.length}개의 자료
                {query && (
                  <span>
                    {" "}
                    —{" "}
                    &ldquo;
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {query}
                    </span>
                    &rdquo; 검색 결과
                  </span>
                )}
              </div>
              {desktopFiltered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {desktopFiltered.map((m, i) => (
                    <MaterialCard
                      key={m.id}
                      material={m}
                      index={i}
                      variant="card"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-slate-400 dark:text-slate-600">
                  <Search size={40} className="mx-auto mb-4 opacity-40" />
                  <p className="text-lg font-semibold">검색 결과가 없습니다.</p>
                  <p className="text-sm mt-1">
                    다른 검색어나 카테고리를 시도해보세요.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ArchivePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 text-slate-400">
          불러오는 중...
        </div>
      }
    >
      <ArchiveContent />
    </Suspense>
  );
}
