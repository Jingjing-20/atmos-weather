import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { CHROME, cn, TEXT } from '../../lib/utils'

function subscribe() {
  return () => {}
}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const active = mounted ? (theme ?? 'system') : 'system'

  function selectTheme(value: (typeof THEME_OPTIONS)[number]['value']) {
    if (value === active) {
      return
    }

    const apply = () => setTheme(value)
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(apply)
      return
    }

    apply()
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full bg-textured p-0.5 shadow-xl',
        CHROME,
      )}
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = active === value

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => selectTheme(value)}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full',
              TEXT,
              isActive && 'bg-base-content text-base-100',
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
