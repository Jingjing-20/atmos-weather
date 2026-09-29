import { CHROME, cn, FOCUS_RING, TEXT } from '../../lib/utils'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <section
      className={cn('rounded-xl bg-textured p-6 text-center shadow-xl', CHROME)}
      aria-labelledby="weather-error-heading"
      role="alert"
    >
      <h2 id="weather-error-heading" className={cn('text-lg font-semibold', TEXT)}>
        Weather is unavailable
      </h2>
      <p className={cn('mt-2 text-sm', TEXT, 'opacity-70')}>{message}</p>
      <button
        className={cn(
          'hover-theme-switch mt-5 cursor-pointer rounded-md bg-textured px-4 py-2 text-sm font-medium shadow-xl',
          CHROME,
          TEXT,
          FOCUS_RING,
        )}
        type="button"
        onClick={onRetry}
      >
        Try again
      </button>
    </section>
  )
}
