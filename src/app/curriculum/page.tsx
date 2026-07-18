"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Search, X, FileDown } from "lucide-react";
import CurriculumCard, { CurriculumItem } from "@/components/CurriculumCard";
import rawCurriculum from "@/data/curriculum.json";

const curriculum: CurriculumItem[] = Array.isArray(rawCurriculum)
  ? (rawCurriculum as CurriculumItem[])
  : [];

const CURRICULUM_PDF_URL =
  "https://drive.google.com/uc?export=download&id=160VYkX9koYIPzsLB6CPHy2MUUwJ_QHsp";

const grades = ["전체", "5학년 1학기", "5학년 2학기", "6학년 1학기", "6학년 2학기"];

export default function CurriculumPage() {
  const [activeGrade, setActiveGrade] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return curriculum
      .filter((item) => activeGrade === "전체" || item.grade === activeGrade)
      .filter(
        (item) =>
          !q ||
          item.mapName.toLowerCase().includes(q) ||
          item.contentElement.toLowerCase().includes(q) ||
          item.unit.toLowerCase().includes(q)
      )
      .sort((a, b) => a.number - b.number);
  }, [activeGrade, query]);

  // 학년 -> 단원 순서로 그룹화
  const groups = useMemo(() => {
    const map = new Map<string, Map<string, CurriculumItem[]>>();
    filtered.forEach((item) => {
      if (!map.has(item.grade)) map.set(item.grade, new Map());
      const unitMap = map.get(item.grade)!;
      if (!unitMap.has(item.unit)) unitMap.set(item.unit, []);
      unitMap.get(item.unit)!.push(item);
    });
    return Array.from(map.entries()).map(([grade, unitMap]) => ({
      grade,
      units: Array.from(unitMap.entries()).map(([unit, items]) => ({
        unit,
        items,
      })),
    }));
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
          <GraduationCap size={14} />
          교육과정 연계
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
          R.E.A.L. 월드유니버스 교육과정 연계표
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          사회과 교육과정 단원별로 연계된{" "}
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {curriculum.length}
          </span>
          개의 마인크래프트 월드를 확인하고 다운로드하세요.
        </p>
        <a
          href={CURRICULUM_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold glass-card border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:shadow-md transition-all"
        >
          <FileDown size={15} />
          교육과정 연계표 PDF 다운로드
        </a>
      </motion.div>

      {/* 검색 + 학년 필터 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="flex flex-col lg:flex-row gap-3 mb-8"
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="맵 이름, 내용 요소, 단원 검색..."
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

        <div className="flex gap-2 flex-wrap">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGrade(g)}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeGrade === g
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
                  : "glass-card border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 결과 */}
      <AnimatePresence mode="wait">
        {groups.length > 0 ? (
          <motion.div
            key={`${activeGrade}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-10"
          >
            {groups.map((g) => (
              <div key={g.grade}>
                <h2 className="text-xl font-black text-slate-800 dark:text-white mb-5 pb-2 border-b border-emerald-500/20">
                  {g.grade}
                </h2>
                <div className="flex flex-col gap-8">
                  {g.units.map((u) => (
                    <div key={u.unit}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                          {u.unit}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {u.items.length}개
                        </span>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {u.items.map((item, i) => (
                          <CurriculumCard key={item.id} item={item} index={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600">
            <Search size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-semibold">검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 검색어나 학년을 시도해보세요.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
