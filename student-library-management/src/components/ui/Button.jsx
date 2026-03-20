import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

const base =
  'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all hover:translate-y-[-1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 text-slate-900 dark:text-white'

const variants = {
  primary:
    'bg-slate-800 text-white shadow-sm shadow-slate-200 hover:bg-slate-700 hover:shadow-md hover:shadow-slate-200 dark:bg-slate-600 dark:shadow-none dark:hover:bg-slate-500',
  secondary:
    'bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700/50',
  danger:
    'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 dark:hover:bg-rose-500/20',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
}

const sizes = {
  sm: 'h-9 px-3',
  md: 'h-11',
  lg: 'h-12 px-6 text-base',
}

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(clsx(base, variants[variant], sizes[size], className))}
      {...props}
    />
  )
})

