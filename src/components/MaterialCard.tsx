"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, FileText, Download, Clock } from "lucide-react";

type Material = {
  id: number;
  category: string;
  title: string;
  description: string;
  isMain: boolean;
  link: string;
};

const categoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string; border: string; label: string }
> = {
  World: {
    icon: <Globe size={20} />,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    label: "월드 파일 (.mcworld)",
  },
  App: {
    icon: <Smartphone size={20} />,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    label: "안드로이드 앱 (.apk)",
  },
  Docs: {
    icon: <FileText size={20} />,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    label: "문서 자료 (.hwp / .pdf)",
  },
};

export default function MaterialCard({
  material,
  index = 0,
  variant = "card",
}: {
  material: Material;
  index?: number;
  variant?: "card" | "list";
}) {
  const cfg = categoryConfig[material.category] ?? categoryConfig["Docs"];
  const hasLink = material.link && material.link.trim() !== "";

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.35 }}
        className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group"
      >
        <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
              {material.category}
            </span>
          </div>
          <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{material.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{material.description}</p>
        </div>
        <div className="flex-shrink-0">
          {hasLink ? (
            <a
              href={material.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors`}
            >
              <Download size={12} />
              다운로드
            </a>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed">
              <Clock size={12} />
              준비 중
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`glass-card rounded-2xl p-6 border ${cfg.border} hover:shadow-2xl transition-all duration-300 flex flex-col gap-4`}
    >
      {/* Icon + Category */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center ${cfg.color}`}>
          {cfg.icon}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
          {material.category}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className={`text-xs font-medium mb-1 ${cfg.color}`}>{cfg.label}</p>
        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug mb-2">
          {material.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {material.description}
        </p>
      </div>

      {/* Button */}
      {hasLink ? (
        <a
          href={material.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-emerald-500/30 transition-all"
        >
          <Download size={15} />
          다운로드
        </a>
      ) : (
        <button
          disabled
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
        >
          <Clock size={15} />
          준비 중
        </button>
      )}
    </motion.div>
  );
}
