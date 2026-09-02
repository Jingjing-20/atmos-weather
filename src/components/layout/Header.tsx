import { CloudSun } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
        <CloudSun className="size-8 shrink-0 text-sky-600" aria-hidden="true" />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Atmos Weather
          </h1>
          <p className="text-sm text-slate-500">Current conditions at a glance</p>
        </div>
      </div>
    </header>
  )
}
