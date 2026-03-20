import { createContext, useContext, useMemo } from 'react'
import useLocalStorageState from './useLocalStorageState'
import booksSeed from '../data/books.json'
import studentsSeed from '../data/students.json'
import { addDays } from '../lib/date'

const LibraryContext = createContext(null)

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}

function nowIso() {
  return new Date().toISOString()
}

function slug(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
}

function gradientFromPalette(emojiOrTitle) {
  const palettes = [
    { from: '#22c55e', to: '#3b82f6' },
    { from: '#f97316', to: '#ef4444' },
    { from: '#a855f7', to: '#3b82f6' },
    { from: '#06b6d4', to: '#8b5cf6' },
    { from: '#f43f5e', to: '#a855f7' },
    { from: '#10b981', to: '#0ea5e9' },
    { from: '#38bdf8', to: '#a855f7' },
    { from: '#f59e0b', to: '#ef4444' },
  ]
  const key = slug(emojiOrTitle)
  let hash = 0
  for (let i = 0; i < key.length; i += 1) hash = (hash + key.charCodeAt(i) * (i + 1)) % 999
  return palettes[hash % palettes.length]
}

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLocalStorageState('slms_books', booksSeed)
  const [students, setStudents] = useLocalStorageState('slms_students', studentsSeed)
  const [issues, setIssues] = useLocalStorageState('slms_issues', [])

  const activeIssueForBook = useMemo(() => {
    const map = new Map()
    for (const issue of issues) {
      if (!issue.returnedAt) map.set(issue.bookId, issue)
    }
    return map
  }, [issues])

  const activeIssueForStudent = useMemo(() => {
    const map = new Map()
    for (const issue of issues) {
      if (!issue.returnedAt) {
        const list = map.get(issue.studentId) || []
        list.push(issue)
        map.set(issue.studentId, list)
      }
    }
    return map
  }, [issues])

  const availableBooks = useMemo(() => {
    return books.filter((b) => !activeIssueForBook.has(b.id))
  }, [books, activeIssueForBook])

  const value = useMemo(() => {
    return {
      books,
      students,
      issues,
      availableBooks,

      ensureStudent: (student) => {
        if (!student || !student.id) return
        setStudents((prev) => {
          const exists = prev.some((s) => s.id === student.id)
          if (exists) return prev
          return [
            ...prev,
            {
              id: student.id,
              name: student.name || 'Student',
              email: student.email || '',
              program: student.program || 'General Studies',
            },
          ]
        })
      },

      isBookAvailable: (bookId) => !activeIssueForBook.has(bookId),

      issueBook: (bookId, studentId) => {
        if (activeIssueForBook.has(bookId)) {
          throw new Error('That book is currently unavailable.')
        }
        const issueDate = nowIso()
        const dueDate = addDays(new Date(issueDate), 14).toISOString()
        const nextIssue = {
          id: `iss-${bookId}-${studentId}-${Date.now()}`,
          bookId,
          studentId,
          issuedAt: issueDate,
          dueDate,
          returnedAt: null,
        }
        setIssues((prev) => [nextIssue, ...prev])
        return nextIssue
      },

      returnBook: (bookId) => {
        const issue = activeIssueForBook.get(bookId)
        if (!issue) throw new Error('No active issue found for this book.')
        const returnAt = nowIso()
        setIssues((prev) =>
          prev.map((i) =>
            i.id === issue.id
              ? {
                  ...i,
                  returnedAt: returnAt,
                }
              : i,
          ),
        )
      },

      addBook: ({ title, author, genre, year }) => {
        const cleanTitle = String(title || '').trim()
        if (!cleanTitle) throw new Error('Book title is required.')

        const cleanAuthor = String(author || '').trim()
        const cleanGenre = String(genre || '').trim() || 'General'
        const cleanYear = Number(year) || new Date().getFullYear()
        const { from, to } = gradientFromPalette(cleanTitle)

        const nextBook = {
          id: `b-${slug(cleanTitle)}-${Date.now().toString(36)}`,
          title: cleanTitle,
          author: cleanAuthor || 'Unknown Author',
          genre: cleanGenre,
          year: cleanYear,
          cover: { emoji: '📚', from, to },
        }

        setBooks((prev) => [nextBook, ...prev])
        return nextBook
      },

      removeBook: (bookId) => {
        const active = activeIssueForBook.get(bookId)
        if (active) throw new Error('You can only remove available books.')

        setBooks((prev) => prev.filter((b) => b.id !== bookId))
        setIssues((prev) => prev.filter((i) => i.bookId !== bookId))
      },

      getStudentById: (studentId) => students.find((s) => s.id === studentId) || null,
      getBookById: (bookId) => books.find((b) => b.id === bookId) || null,

      getActiveIssuesForStudent: (studentId) => activeIssueForStudent.get(studentId) || [],

      getActiveIssuesDetailedForLibrarian: () => {
        // List all active issues enriched with book + student.
        return issues
          .filter((i) => !i.returnedAt)
          .map((i) => {
            const book = books.find((b) => b.id === i.bookId) || null
            const student = students.find((s) => s.id === i.studentId) || null
            return { ...i, book, student }
          })
          .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))
      },
    }
  }, [
    activeIssueForBook,
    activeIssueForStudent,
    books,
    issues,
    students,
    setBooks,
    setIssues,
    setStudents,
    availableBooks,
  ])

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

