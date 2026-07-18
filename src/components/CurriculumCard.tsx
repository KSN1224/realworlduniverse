"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, ImageOff } from "lucide-react";

export type CurriculumItem = {
  id: number;
  grade: string;
  unit: string;
  number: number;
  mapName: string;
  contentElement: string;
  activity: string;
  photoId: string;
  worldId: string;
};

function photoUrl(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
}

function downloadUrl(id: string) {
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

export default function CurriculumCard({
  item,
  index = 0,
}: {
  item: CurriculumItem;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const maxRetries = 3;

  const handleImgError = () => {
    if (retryToken < maxRetries) {
      setImgLoaded(false);
      setTimeout(() => setRetryToken((v) => v + 1), 700 * (retryToken + 1));
    } else {
      setImgError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.35 }}
      className="glass-card rounded-2xl overflow-hidden border border-emerald-500/15 hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row"
    >
      {/* 참고 사진 */}
      <div className="relative w-full sm:w-56 aspect-video sm:aspect-square flex-shrink-0 bg-slate-100 dark:bg-slate-800">
        {!imgError ? (
          <img
            key={retryToken}
            src={`${photoUrl(item.photoId)}${retryToken > 0 ? `&r=${retryToken}` : ""}`}
            alt={imgLoaded ? item.mapName : ""}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={handleImgError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
            <ImageOff size={28} />
          </div>
        )}
        <span className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/60 text-white text-xs font-bold flex items-center justify-center backdrop-blur-sm">
          {item.number}
        </span>
      </div>

      {/* 본문 */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2.5 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            {item.grade}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 font-medium truncate max-w-[220px]">
            {item.unit}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug">
            {item.mapName}
          </h3>
          <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-medium mt-0.5">
            {item.contentElement}
          </p>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p className={expanded ? "" : "line-clamp-2"}>{item.activity}</p>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          >
            {expanded ? "간략히" : "활동 내용 더보기"}
            <ChevronDown
              size={12}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="mt-auto pt-1">
          <a
            href={downloadUrl(item.worldId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-emerald-500/30 transition-all"
          >
            <Download size={13} />
            월드 다운로드
          </a>
        </div>
      </div>
    </motion.div>
  );
}
