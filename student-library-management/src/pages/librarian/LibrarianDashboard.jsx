import { useMemo } from 'react'
import Card from '../../components/ui/Card'
import { FiBookOpen, FiUsers, FiClock } from 'react-icons/fi'
import { useLibrary } from '../../context/LibraryContext'

export default function LibrarianDashboard() {
  const { books, issues } = useLibrary()
  const activeIssues = issues.filter((i) => !i.returnedAt)
  const dueSoonCount = useMemo(() => {
    const nowMs = new Date().getTime() + 7 * 86400000
    return activeIssues.filter((i) => new Date(i.dueDate).getTime() < nowMs).length
  }, [activeIssues])

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="text-slate-600 dark:text-white/70 text-sm font-semibold">Admin snapshot</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">At a glance</div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
                  <FiBookOpen />
                </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 dark:text-white/60">Total books</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{books.length}</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <FiUsers />
                </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 dark:text-white/60">Active issues</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{activeIssues.length}</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-400/10 text-rose-200">
                  <FiClock />
                </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 dark:text-white/60">Due soon (7d)</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{dueSoonCount}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-black/5 bg-white/70 p-4 text-sm text-slate-700/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            Use the sidebar to add books, manage inventory, and track which student has each issued book.
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="text-slate-600 dark:text-white/70 text-sm font-semibold">Next actions</div>
        <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Quick launch</div>
        <div className="mt-4 space-y-3 text-sm text-slate-700/70 dark:text-white/70">
          <div className="rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            Add a new book to the catalog.
          </div>
          <div className="rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            Open the “Issued” page to see student assignments.
          </div>
          <div className="rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            Remove books only when they are available.
          </div>
        </div>
      </Card>
    </div>
  )
}

