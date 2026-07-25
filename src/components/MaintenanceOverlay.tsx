// 유지보수 모드 오버레이.
// 복구 방법 (택1):
//   1) layout.tsx 에서 <MaintenanceOverlay /> 줄을 주석 처리
//   2) 아래 className 의 "flex" 를 "hidden" 으로 변경
export default function MaintenanceOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-2xl dark:bg-slate-900">
        <p className="text-xl font-bold text-slate-900 dark:text-white">
          홈페이지 콘텐츠 업그레이드 중
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          더 나은 서비스 제공을 위해 콘텐츠를 업데이트하고 있습니다.
          <br />
          잠시 후 다시 방문해 주세요.
        </p>
      </div>
    </div>
  );
}
