import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { FiBook, FiUser, FiTag } from 'react-icons/fi'

const MotionDiv = motion.div

export default function BookCard({ book, onAction, actionLabel, actionVariant, meta, trailing }) {
  return (
    <MotionDiv
      whileHover={{ y: -2 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:ring-white/5"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(99,102,241,0.06),transparent_50%)] dark:bg-[radial-gradient(400px_circle_at_50%_0%,rgba(99,102,241,0.1),transparent_50%)]" />

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            <FiBook className="h-6 w-6" />
          </div>
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>

        <div className="mt-5">
          <div className="truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            {book.title}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 truncate text-sm font-bold text-slate-500 dark:text-slate-400">
            <FiUser className="h-3.5 w-3.5" />
            {book.author}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {book.genre && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FiTag className="h-3 w-3" />
              {book.genre}
            </div>
          )}
          {meta && (
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500">
              • {meta}
            </div>
          )}
        </div>
      </div>

      {onAction ? (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <Button
            size="md"
            variant={actionVariant || 'primary'}
            onClick={onAction}
            className="w-full text-xs uppercase tracking-widest"
          >
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </MotionDiv>
  )
}

