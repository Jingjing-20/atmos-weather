export function Dashboard() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      <section
        className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
        aria-labelledby="empty-heading"
      >
        <h2 id="empty-heading" className="text-lg font-medium text-slate-900">
          No location selected
        </h2>
        <p className="mt-2 text-pretty text-sm text-slate-600">
          Search for a city to see current weather, details, and forecasts.
        </p>
      </section>
    </main>
  )
}
