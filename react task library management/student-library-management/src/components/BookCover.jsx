import { twMerge } from 'tailwind-merge'

export default function BookCover({ cover, className = '' }) {
  const emoji = cover?.emoji || '📚'
  const from = cover?.from || '#a855f7'
  const to = cover?.to || '#3b82f6'

  return (
    <div
      className={twMerge(
        `relative grid h-28 w-20 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm`,
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${from}55, ${to}55)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at top left, ${from}66, transparent 55%)`,
        }}
      />
      <div className="relative text-3xl drop-shadow-sm">{emoji}</div>
    </div>
  )
}

