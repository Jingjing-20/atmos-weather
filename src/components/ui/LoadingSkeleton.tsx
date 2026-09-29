import { CHROME, cn } from '../../lib/utils'

export function LoadingSkeleton() {
  return (
    <section
      className={cn('animate-pulse rounded-xl bg-gradient-card p-6 shadow-xl sm:p-8', CHROME)}
      aria-label="Loading current weather"
      aria-busy="true"
    >
      <div className="h-4 w-28 rounded bg-base-content/10" />
      <div className="mt-3 h-9 w-48 rounded bg-base-content/10" />
      <div className="mt-10 h-16 w-36 rounded bg-base-content/10" />
      <div className="mt-8 h-4 w-32 rounded bg-base-content/10" />
    </section>
  )
}
