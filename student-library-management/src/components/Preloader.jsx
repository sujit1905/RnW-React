import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'

const MotionDiv = motion.div

export default function Preloader({ text = 'Student Library' }) {
  return (
    <div className="flex min-h-[70svh] w-full flex-col items-center justify-center space-y-6 px-4">
      <MotionDiv
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/5 dark:bg-slate-800/50 dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] dark:ring-white/10"
      >
        <FiBookOpen className="h-10 w-10 text-slate-600 dark:text-slate-300" />
        
        {/* Subtle pulsing background ring */}
        <MotionDiv
          className="absolute inset-0 -z-10 rounded-2xl border-2 border-slate-200 dark:border-slate-700"
          animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
      </MotionDiv>

      <div className="flex flex-col items-center space-y-1.5 text-center">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{text}</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your workspace...</p>
      </div>

      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800/80">
        <MotionDiv
          className="h-full rounded-full bg-slate-400 dark:bg-slate-500"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

