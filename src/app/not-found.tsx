import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-6xl font-black text-slate-200 dark:text-slate-800 mb-4">404</h2>
      <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">페이지를 찾을 수 없습니다.</p>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
