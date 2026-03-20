import { FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

export default function TopBar({ title, subtitle }) {
  const { logout } = useAuth()

  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</div>
        {subtitle ? <div className="mt-1 text-sm text-slate-600 dark:text-white/70">{subtitle}</div> : null}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            logout()
            window.location.href = '/auth'
          }}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-rose-600 shadow-sm transition-all hover:bg-rose-100"
        >
          <FiLogOut />
          <span className="hidden text-sm font-bold sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}

