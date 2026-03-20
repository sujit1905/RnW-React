import { useLibrary } from '../../context/LibraryContext'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/feedback/EmptyState'
import Badge from '../../components/ui/Badge'
import { formatDate, isOverdue } from '../../lib/date'

export default function LibrarianIssued() {
  const { getActiveIssuesDetailedForLibrarian } = useLibrary()
  const issues = getActiveIssuesDetailedForLibrarian()
  const now = new Date()

  const byStudent = (() => {
    const map = new Map()
    for (const issue of issues) {
      const key = issue.student?.id || 'unknown'
      const list = map.get(key) || []
      list.push(issue)
      map.set(key, list)
    }
    return Array.from(map.values()).sort((a, b) => {
      const aName = a[0]?.student?.name || ''
      const bName = b[0]?.student?.name || ''
      return aName.localeCompare(bName)
    })
  })()

  return (
    <Card className="p-6">
      <div className="text-slate-600 dark:text-white/70 text-sm font-semibold">Issued books</div>
      <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Student assignments</div>

      {issues.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No active issues" description="When students issue books, you’ll see them listed here." />
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {byStudent.map((studentIssues) => {
            const student = studentIssues[0]?.student
            return (
              <div
                key={student?.id}
                className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">{student?.name || 'Unknown student'}</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-white/60">Active borrowings</div>
                  </div>
                  <Badge tone="neutral">{studentIssues.length} book(s)</Badge>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {studentIssues
                    .slice()
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .map((issue) => {
                      const overdue = isOverdue(issue.dueDate, now)
                      return (
                        <div
                          key={issue.id}
                          className="rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-slate-900 dark:text-white/90 font-semibold">{issue.book?.title}</div>
                              <div className="mt-1 text-xs text-slate-600 dark:text-white/60 truncate">{issue.book?.author}</div>
                            </div>
                            <Badge tone={overdue ? 'danger' : 'neutral'}>{overdue ? 'Overdue' : 'Active'}</Badge>
                          </div>
                          <div className="mt-2 text-xs text-slate-600 dark:text-white/60">
                            Issued: <span className="text-slate-900 dark:text-white/80">{formatDate(issue.issuedAt)}</span>
                          </div>
                          <div className={`mt-1 text-xs ${overdue ? 'text-rose-700 dark:text-rose-200' : 'text-slate-600 dark:text-white/60'}`}>
                            Return by: <span className="text-slate-900 dark:text-white/80">{formatDate(issue.dueDate)}</span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

