"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Globe, Smartphone, FileText } from "lucide-react";
import Link from "next/link";
import MaterialCard from "@/components/MaterialCard";
import rawMaterials from "@/data/materials.json";

const materials = Array.isArray(rawMaterials) ? rawMaterials : [];
const mainMaterials = materials.filter((m) => m.isMain);

export default function HomePage() {
  const stats = [
    { icon: <Globe size={16} />, label: "월드 파일", color: "text-emerald-500", count: materials.filter(m => m.category === "World").length },
    { icon: <Smartphone size={16} />, label: "앱 파일", color: "text-blue-500", count: materials.filter(m => m.category === "App").length },
    { icon: <FileText size={16} />, label: "문서 자료", color: "text-orange-500", count: materials.filter(m => m.category === "Docs").length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
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

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-sm">
              <span className={s.color}>{s.icon}</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{s.count}</span>
              <span className="text-slate-400 dark:text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Materials */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">주요 자료</h2>
          <Link
            href="/archive"
            className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            전체 보기 <ArrowRight size={14} />
          </Link>
        </div>

        {mainMaterials.length === 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500 py-12">
            등록된 주요 자료가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mainMaterials.map((m, i) => (
              <MaterialCard key={m.id} material={m} index={i} variant="card" />
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 glass-card rounded-2xl p-8 border border-emerald-500/20 text-center"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          더 많은 자료를 찾고 계신가요?
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm">
          전체 자료실에서 카테고리 필터와 검색으로 원하는 자료를 찾아보세요.
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
