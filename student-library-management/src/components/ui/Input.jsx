import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export const Input = forwardRef(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={twMerge(
        clsx(
          'h-11 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-all',
          'border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10',
          invalid ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/10' : null,
          'dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:border-slate-700 dark:focus:border-slate-400 dark:focus:ring-slate-400/10',
          invalid ? 'dark:border-rose-400 dark:focus:border-rose-400 dark:focus:ring-rose-400/10' : null,
          className,
        ),
      )}
      {...props}
    />
  )
})

