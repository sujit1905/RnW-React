import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useLibrary } from '../../context/LibraryContext'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/feedback/EmptyState'
import Modal from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import BookCard from '../../components/BookCard'
import { Input } from '../../components/ui/Input'

export default function LibrarianBooks() {
  const library = useLibrary()
  const { books } = library
  const [query, setQuery] = useState('')
  const [confirm, setConfirm] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return books
    return books.filter((b) => `${b.title} ${b.author} ${b.genre}`.toLowerCase().includes(q))
  }, [books, query])

  return (
    <div>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-slate-600 dark:text-white/70 text-sm font-semibold">All books</div>
            <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Library catalog</div>
          </div>
          <div className="w-full sm:w-72">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author, genre..."
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="No books found" description="Try adjusting your search." />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((b) => {
              const available = library.isBookAvailable(b.id)
              return (
                <BookCard
                  key={b.id}
                  book={b}
                  meta={b.year}
                  actionLabel="Remove"
                  actionVariant="danger"
                  onAction={
                    available
                      ? () => setConfirm(b)
                      : undefined
                  }
                  trailing={
                    <Badge tone={available ? 'success' : 'warning'}>{available ? 'Available' : 'Issued'}</Badge>
                  }
                />
              )
            })}
          </div>
        )}
      </Card>

      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Remove book"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setConfirm(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!confirm) return
                try {
                  library.removeBook(confirm.id)
                  toast.success('Book removed.')
                  setConfirm(null)
                } catch (err) {
                  toast.error(err?.message || 'Could not remove the book.')
                }
              }}
            >
              Remove
            </Button>
          </div>
        }
      >
        {confirm ? (
          <div className="text-sm text-slate-700 dark:text-white/75">
            Remove <span className="font-bold text-slate-900 dark:text-white">{confirm.title}</span> from the catalog?
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

