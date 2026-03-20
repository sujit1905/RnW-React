export default function EmptyState({ title, description, children }) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-black/5 bg-white/70 p-8 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-400/20 to-cyan-400/20 p-3 shadow-inner">
        <svg viewBox="0 0 24 24" className="h-full w-full text-violet-600 dark:text-violet-300" fill="none">
          <path
            d="M12 2a7 7 0 0 0-7 7v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M8 22h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-lg font-semibold text-slate-900 dark:text-white">{title}</div>
      {description ? <div className="mt-1 text-sm text-slate-600 dark:text-white/70">{description}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  )
}

