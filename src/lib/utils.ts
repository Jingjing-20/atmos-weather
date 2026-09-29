import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CHROME = 'border border-solid border-gray-300 dark:border-white/20'
export const TEXT = 'text-base-content'
export const FOCUS_RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

export const SURFACE = cn(
  'rounded-xl bg-textured shadow-xl',
  CHROME,
)

export const SECTION_HEADING = cn(
  TEXT,
  'text-lg font-semibold tracking-tight',
)
