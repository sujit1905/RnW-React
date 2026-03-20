export default function PageFrame({ children }) {
  return (
    <div
      className="min-h-[100svh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">{children}</div>
    </div>
  )
}

