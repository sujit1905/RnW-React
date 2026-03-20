import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLibrary } from '../../context/LibraryContext'
import Card from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'

export default function LibrarianAddBook() {
  const library = useLibrary()
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'Software',
    year: new Date().getFullYear(),
  })

  const [openPreview, setOpenPreview] = useState(false)

  function validate() {
    if (!String(form.title).trim()) return 'Title is required.'
    if (!String(form.author).trim()) return 'Author is required.'
    if (!form.year || Number(form.year) < 0) return 'Year must be valid.'
    return null
  }

  function onSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) {
      toast.error(err)
      return
    }
    setOpenPreview(true)
  }

  function confirmAdd() {
    try {
      library.addBook(form)
      toast.success('Book added to catalog.')
      setOpenPreview(false)
      setForm({
        title: '',
        author: '',
        genre: 'Software',
        year: new Date().getFullYear(),
      })
    } catch (err) {
      toast.error(err?.message || 'Could not add book.')
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-slate-600 dark:text-white/70 text-sm font-semibold">Add new book</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Catalog expansion</div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Title</label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Designing Data-Intensive Applications"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Author</label>
          <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="e.g. Martin Kleppmann" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Genre</label>
          <Select value={form.genre} onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}>
            <option>Software</option>
            <option>Web Development</option>
            <option>AI & Data</option>
            <option>Design</option>
            <option>Self-Help</option>
            <option>Management</option>
            <option>Psychology</option>
            <option>Creative Tech</option>
            <option>Data</option>
            <option>General</option>
          </Select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Year</label>
          <Input
            value={form.year}
            type="number"
            onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
          />
        </div>


        <div className="sm:col-span-2">
          <Button type="submit" className="w-full">
            Add book
          </Button>
        </div>
      </form>

      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        title="Confirm add book"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => setOpenPreview(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={confirmAdd}>
              Add to catalog
            </Button>
          </div>
        }
      >
        <div className="rounded-3xl border border-black/5 bg-white/70 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
          You’re adding <span className="font-bold text-slate-900 dark:text-white/95">{form.title || 'Untitled'}</span> by{' '}
          <span className="font-semibold text-slate-800 dark:text-white/90">{form.author || 'Unknown'}</span>.
        </div>
      </Modal>
    </Card>
  )
}

