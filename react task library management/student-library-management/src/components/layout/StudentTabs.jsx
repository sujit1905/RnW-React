import { NavLink } from 'react-router-dom'
import { FiHome, FiBookOpen } from 'react-icons/fi'

export default function StudentTabs() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-black/5 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <NavLink
        to="/student/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
            isActive
              ? 'border border-slate-300 bg-white text-slate-900 shadow-sm dark:text-white'
              : 'border border-transparent text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
          }`
        }
      >
        <FiHome />
        Available
      </NavLink>
      <NavLink
        to="/student/my-books"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
            isActive
              ? 'border border-slate-300 bg-white text-slate-900 shadow-sm dark:text-white'
              : 'border border-transparent text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
          }`
        }
      >
        <FiBookOpen />
        My Books
      </NavLink>
    </div>
  )
}

