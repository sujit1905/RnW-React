import PageFrame from '../../components/layout/PageFrame'
import TopBar from '../../components/layout/TopBar'
import EmptyState from '../../components/feedback/EmptyState'
import { useAuth } from '../../context/AuthContext'
import { useLibrary } from '../../context/LibraryContext'
import { formatDate, isOverdue } from '../../lib/date'
import Badge from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import StudentTabs from '../../components/layout/StudentTabs'
import toast from 'react-hot-toast'

export default function MyBooks() {
  const { user } = useAuth()
  const library = useLibrary()
  const { getActiveIssuesForStudent } = library
  const issues = user ? getActiveIssuesForStudent(user.id) : []

  const now = new Date()

  return (
    <PageFrame>
      <div className="flex flex-col gap-6">
        <TopBar title="My Books" subtitle="Due dates, returns, and overdue indicators." />
        <StudentTabs />

        {issues.length === 0 ? (
          <EmptyState title="No books issued yet" description="Pick a book from Available Books and issue it in one tap." />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {issues.map((issue) => {
              const overdue = isOverdue(issue.dueDate, now)
              const book = library.getBookById(issue.bookId)
              return (
                <div
                  key={issue.id}
                  className={`rounded-3xl border p-4 shadow-sm backdrop-blur ${
                    overdue
                      ? 'border-rose-300/40 bg-rose-100/40 dark:border-rose-400/30 dark:bg-rose-400/10'
                      : 'border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-slate-900 dark:text-white font-bold">{book?.title || 'Book'}</div>
                      <div className="mt-1 text-sm text-slate-600 dark:text-white/65">{book?.author || ''}</div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge tone={overdue ? 'danger' : 'neutral'}>{overdue ? 'Overdue' : 'Active'}</Badge>
                        <div className="text-xs text-slate-600 dark:text-white/60">
                          Issued: <span className="text-slate-900 dark:text-white/80">{formatDate(issue.issuedAt)}</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-white/60">
                          Return by:{' '}
                          <span
                            className={`text-slate-900 dark:text-white/80 ${overdue ? 'text-rose-700 dark:text-rose-200' : ''}`}
                          >
                            {formatDate(issue.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button
                        variant={overdue ? 'danger' : 'secondary'}
                        onClick={() => {
                          try {
                            library.returnBook(issue.bookId)
                            toast.success('Book returned. Thank you!')
                          } catch (err) {
                            toast.error(err?.message || 'Could not return the book.')
                          }
                        }}
                        size="md"
                      >
                        Return
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageFrame>
  )
}

