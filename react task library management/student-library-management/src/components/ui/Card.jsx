import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export default function Card({ className, children, variant = 'glass' }) {
  const variants = {
    glass:
      'rounded-[2rem] border border-slate-200/60 bg-white/70 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:ring-white/5',
    solid:
      'rounded-[2rem] border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:ring-white/5',
  }
  return (
    <div className={twMerge(clsx('transition-all hover:shadow-md', variants[variant], className))}>
      {children}
    </div>
  )
}

