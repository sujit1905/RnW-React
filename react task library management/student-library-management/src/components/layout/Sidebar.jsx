import { NavLink, useLocation } from 'react-router-dom'
import { FiBook, FiLayout, FiPlusSquare, FiUsers, FiLogOut, FiBookOpen } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const defaultItems = [
  { to: '/librarian/dashboard', label: 'Dashboard', Icon: FiLayout, key: 'dash' },
  { to: '/librarian/add', label: 'Add Book', Icon: FiPlusSquare, key: 'add' },
  { to: '/librarian/books', label: 'Books', Icon: FiBook, key: 'books' },
  { to: '/librarian/issued', label: 'Issued', Icon: FiUsers, key: 'issued' },
]

export default function Sidebar({ items = defaultItems, className = '' }) {
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <aside
      className={`sticky top-6 hidden h-[calc(100svh-48px)] w-72 flex-col gap-4 rounded-[2.5rem] border border-slate-200/60 bg-white/70 p-4 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-md lg:flex ${className} dark:border-slate-800/60 dark:bg-slate-900/40 dark:ring-white/5`}
    >
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-slate-800 text-white shadow-md shadow-slate-200/40 dark:bg-white/10 dark:shadow-none">
            <FiBookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">Library Admin</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Manage & track</div>
          </div>
        </div>
      </div>

      <nav className="mt-2 flex flex-col gap-1 px-1">
        {items.map(({ to, label, Icon, key }) => {
          const isActive = location.pathname === to
          const NavIcon = Icon
          return (
            <NavLink
              key={key}
              to={to}
              className={({ isActive: navActive }) =>
                `group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all
                ${
                  navActive || isActive
                    ? 'border-slate-200 bg-slate-100/70 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`
              }
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-2xl border transition-all ${
                  isActive
                    ? 'border-slate-300 bg-white text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200'
                    : 'border-slate-100 bg-white shadow-sm text-slate-500 group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                <NavIcon className="h-5 w-5" />
              </span>
              <span className="truncate">{label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto px-2 pb-2">
        <div className="mt-3">
          <button
            type="button"
            onClick={() => {
              logout()
              window.location.href = '/auth'
            }}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 shadow-sm transition-all hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
          >
            <FiLogOut />
            <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

