interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <section
      className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center"
      aria-labelledby="weather-error-heading"
      role="alert"
    >
      <h2 id="weather-error-heading" className="text-lg font-semibold text-rose-950">
        Weather is unavailable
      </h2>
      <p className="mt-2 text-sm text-rose-800">{message}</p>
      <button
        className="mt-5 rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
        type="button"
        onClick={onRetry}
      >
        Try again
      </button>
    </section>
  )
}
