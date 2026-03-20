import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const palette = {
  neutral: 'bg-slate-900/5 text-slate-700 border-slate-900/10 dark:bg-white/5 dark:text-white/80 dark:border-white/10',
  success:
    'bg-emerald-400/10 text-emerald-800 border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200 dark:border-emerald-400/20',
  warning:
    'bg-amber-400/10 text-amber-800 border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200 dark:border-amber-400/20',
  danger:
    'bg-rose-400/10 text-rose-800 border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200 dark:border-rose-400/20',
}

export default function Badge({ className, tone = 'neutral', children }) {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shadow-sm',
          palette[tone],
          className,
        ),
      )}
    >
      {children}
    </span>
  )
}

