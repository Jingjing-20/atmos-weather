import { CloudSun } from 'lucide-react'
import { CHROME, cn, TEXT } from '../../lib/utils'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  return (
    <header className={cn('sticky top-0 z-20 bg-textured/90 backdrop-blur-md', CHROME, 'border-x-0 border-t-0')}>
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-textured shadow-xl',
              CHROME,
            )}
            aria-hidden="true"
          >
            <CloudSun className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className={cn('truncate text-lg font-bold tracking-tight sm:text-xl', TEXT)}>
              Atmos Weather
            </h1>
            <p className={cn('truncate text-[10px] sm:text-xs', TEXT, 'opacity-70')}>
              Current conditions at a glance
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
