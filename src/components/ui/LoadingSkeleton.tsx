export function LoadingSkeleton() {
  return (
    <section
      className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-label="Loading current weather"
      aria-busy="true"
    >
      <div className="h-4 w-28 rounded bg-slate-200" />
      <div className="mt-3 h-9 w-48 rounded bg-slate-200" />
      <div className="mt-10 h-18 w-36 rounded bg-slate-200" />
      <div className="mt-8 h-4 w-32 rounded bg-slate-200" />
    </section>
  )
}
