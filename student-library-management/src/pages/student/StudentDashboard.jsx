import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import PageFrame from '../../components/layout/PageFrame'
import TopBar from '../../components/layout/TopBar'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/feedback/EmptyState'
import { useLibrary } from '../../context/LibraryContext'
import { useAuth } from '../../context/AuthContext'
import BookCard from '../../components/BookCard'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { formatDate } from '../../lib/date'
import StudentTabs from '../../components/layout/StudentTabs'

export default function StudentDashboard() {
  const { user } = useAuth()
  const library = useLibrary()
  const { availableBooks } = library
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('all')

  const genres = useMemo(() => {
    const set = new Set(availableBooks.map((b) => b.genre))
    return ['all', ...Array.from(set)]
  }, [availableBooks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return availableBooks.filter((b) => {
      const matchesGenre = genre === 'all' ? true : b.genre === genre
      const matchesQuery = !q ? true : `${b.title} ${b.author} ${b.genre}`.toLowerCase().includes(q)
      return matchesGenre && matchesQuery
    })
  }, [availableBooks, genre, query])

  return (
    <PageFrame>
      <div className="flex flex-col gap-6">
        <TopBar title="Available Books" subtitle="Search, preview covers, and issue instantly." />
        <StudentTabs />

        <div className="grid grid-cols-1 gap-5">
          <div className="min-w-0">
            <Card className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-slate-900 dark:text-white text-lg font-bold">Explore the library</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-white/65">Browse and issue books from the collection.</div>
                </div>
                <div className="w-full sm:w-80">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, author, or genre..."
                  />
                </div>
                <div className="w-full sm:w-52">
                  <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g === 'all' ? 'All genres' : g}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="mt-6">
                  <EmptyState title="No matches found" description="Try a different keyword or clear your search." />
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      meta={book.year}
                      actionLabel="Issue"
                      actionVariant="primary"
                      onAction={() => {
                        if (!user) return
                        try {
                          // issueBook is sync; handle with toast.
                          const issue = library.issueBook(book.id, user.id)
                          toast.success(`Issued ${formatDate(issue.issuedAt)} • return by ${formatDate(issue.dueDate)}.`)
                        } catch (err) {
                          toast.error(err?.message || 'Could not issue the book.')
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

