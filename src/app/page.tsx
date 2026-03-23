"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowRight, Globe, Smartphone, FileText } from "lucide-react";
import Link from "next/link";
import MaterialCard from "@/components/MaterialCard";
import rawMaterials from "@/data/materials.json";

const materials = Array.isArray(rawMaterials) ? rawMaterials : [];

const filterDefs = [
  {
    value: "All",
    label: "전체",
    icon: null,
    color: "text-slate-600 dark:text-slate-300",
    activeClass:
      "bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent",
  },
  {
    value: "World",
    label: "월드",
    icon: <Globe size={14} />,
    color: "text-emerald-600 dark:text-emerald-400",
    activeClass:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/40",
  },
  {
    value: "App",
    label: "앱",
    icon: <Smartphone size={14} />,
    color: "text-blue-600 dark:text-blue-400",
    activeClass:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/40",
  },
  {
    value: "Docs",
    label: "문서",
    icon: <FileText size={14} />,
    color: "text-orange-600 dark:text-orange-400",
    activeClass:
      "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/40",
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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleFilter = (value: string) => {
    setActiveCategory(value);
  };

  // 모바일: 전체 또는 필터 적용 후 id 내림차순(최신순)
  const mobileFeed = useMemo(() => {
    return [...materials]
      .filter(
        (m) => activeCategory === "All" || m.category === activeCategory
      )
      .sort((a, b) => b.id - a.id);
  }, [activeCategory]);

  // 데스크톱 All: 3열 칼럼 데이터
  const desktopColumns = useMemo(() => {
    return columnDefs.map((col) => ({
      ...col,
      items: materials.filter((m) => m.category === col.cat),
    }));
  }, []);

  // 데스크톱 필터: 특정 카테고리만
  const desktopFiltered = useMemo(() => {
    if (activeCategory === "All") return [];
    return materials.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const stats = [
    { label: "월드", count: materials.filter((m) => m.category === "World").length, color: "text-emerald-500" },
    { label: "앱", count: materials.filter((m) => m.category === "App").length, color: "text-blue-500" },
    { label: "문서", count: materials.filter((m) => m.category === "Docs").length, color: "text-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6"
        >
          <BookOpen size={14} />
          교육용 학습 자료실
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
          R.E.A.L.{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
            추체험 학습
          </span>{" "}
          자료실
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          마인크래프트 월드, 안드로이드 앱, 학습 문서를 한 곳에서 만나보세요.
        </p>

        {/* 통계 */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          {stats.map((s) => (
            <span key={s.label} className="flex items-center gap-1">
              <span className={`font-bold ${s.color}`}>{s.count}</span>
              <span className="text-slate-400 dark:text-slate-500">{s.label}</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* 필터 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="flex items-center justify-center gap-2 mb-8 flex-wrap"
      >
        {filterDefs.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilter(f.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
              activeCategory === f.value
                ? f.activeClass
                : "glass-card border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* ── 모바일 피드 (md 미만) ── */}
      <div className="md:hidden">
        <div className="text-xs text-slate-400 dark:text-slate-500 mb-3">
          {mobileFeed.length}개 · {activeCategory === "All" ? "최신순" : filterDefs.find(f => f.value === activeCategory)?.label}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {mobileFeed.length > 0 ? (
              mobileFeed.map((m, i) => (
                <MaterialCard key={m.id} material={m} index={i} variant="list" />
              ))
            ) : (
              <p className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
                해당 카테고리의 자료가 없습니다.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 데스크톱 레이아웃 (md 이상) ── */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {activeCategory === "All" ? (
            /* 3열 카테고리 레이아웃 */
            <motion.div
              key="desktop-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 gap-6"
            >
              {desktopColumns.map((col) => (
                <div key={col.cat}>
                  {/* 칼럼 헤더 */}
                  <div className={`flex items-center gap-2 mb-5 pb-3 border-b ${col.border}`}>
                    <div className={`w-8 h-8 rounded-lg ${col.bg} flex items-center justify-center ${col.color}`}>
                      {col.icon}
                    </div>
                    <div>
                      <h2 className={`font-bold text-sm ${col.color}`}>{col.label}</h2>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{col.items.length}개</p>
                    </div>
                  </div>
                  {/* 칼럼 아이템 */}
                  {col.items.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {col.items.map((m, i) => (
                        <MaterialCard key={m.id} material={m} index={i} variant="card" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-300 dark:text-slate-600 text-sm">
                      자료 없음
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            /* 필터 적용 시 그리드 */
            <motion.div
              key={`desktop-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                {desktopFiltered.length}개의 자료
              </div>
              {desktopFiltered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {desktopFiltered.map((m, i) => (
                    <MaterialCard key={m.id} material={m} index={i} variant="card" />
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
                  해당 카테고리의 자료가 없습니다.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-14 glass-card rounded-2xl p-8 border border-emerald-500/20 text-center"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          더 많은 자료를 찾고 계신가요?
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm">
          전체 자료실에서 검색과 필터로 원하는 자료를 찾아보세요.
        </p>
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          전체 자료실 바로가기 <ArrowRight size={15} />
        </Link>
      </motion.div>
    </div>
  );
}
