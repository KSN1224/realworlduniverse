"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video as VideoIcon } from "lucide-react";
import rawVideos from "@/data/videos.json";

type VideoItem = {
  id: number;
  title: string;
  fileId: string;
  thumbId: string;
};

const videos: VideoItem[] = Array.isArray(rawVideos) ? rawVideos : [];

function thumbUrl(thumbId: string) {
  return `https://drive.google.com/thumbnail?id=${thumbId}&sz=w1000`;
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo]);

  if (videos.length === 0) return null;

  const [featured, ...rest] = videos;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <VideoIcon size={16} />
          </div>
          <h2 className="font-bold text-lg text-slate-800 dark:text-white">
            안내 동영상
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 대표 영상 */}
          <button
            onClick={() => setActiveVideo(featured)}
            className="group relative lg:col-span-2 aspect-video rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-700 text-left"
          >
            <img
              src={thumbUrl(featured.thumbId)}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={26} className="text-purple-600 ml-1" fill="currentColor" />
              </div>
            </div>
            <p className="absolute bottom-3 left-4 right-4 text-white font-semibold text-sm sm:text-base drop-shadow">
              {featured.title}
            </p>
          </button>

          {/* 나머지 영상 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {rest.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVideo(v)}
                className="group relative aspect-video rounded-xl overflow-hidden glass-card border border-slate-200 dark:border-slate-700 text-left"
              >
                <img
                  src={thumbUrl(v.thumbId)}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Play size={14} className="text-purple-600 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <p className="absolute bottom-1.5 left-2 right-2 text-white font-medium text-[11px] sm:text-xs truncate drop-shadow">
                  {v.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 재생 모달 */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 sm:top-2 sm:left-2 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
              <iframe
                src={`https://drive.google.com/file/d/${activeVideo.fileId}/preview`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
