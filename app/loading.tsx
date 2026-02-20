// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-aura-black border-t-transparent animate-spin" />
        <span className="text-[11px] font-body tracking-[0.3em] uppercase text-aura-muted">Loading</span>
      </div>
    </div>
  )
}
