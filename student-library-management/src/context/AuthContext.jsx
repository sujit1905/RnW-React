import { createContext, useContext, useMemo, useState } from 'react'
import useLocalStorageState from './useLocalStorageState'
import authUsersSeed from '../data/authUsers.json'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function idFromEmail(prefix, email) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
  return `${prefix}-${normalized || 'user'}`
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorageState('slms_user', null)
  const [authUsers, setAuthUsers] = useLocalStorageState('slms_auth_users', authUsersSeed)
  const [authLoading, setAuthLoading] = useState(false)

  const value = useMemo(() => {
    return {
      user,
      authLoading,
      login: async ({ role, name, email, password, mode }) => {
        setAuthLoading(true)
        try {
          const cleanEmail = String(email || '').trim().toLowerCase()
          const cleanPassword = String(password || '')
          const wantedRole = role === 'librarian' ? 'librarian' : 'student'

          if (!cleanEmail || !cleanPassword) {
            throw new Error('Email and password are required.')
          }
          if (cleanPassword.length < 4) {
            throw new Error('Password must be at least 4 characters.')
          }

          const existing = authUsers.find((u) => u.email.toLowerCase() === cleanEmail && u.role === wantedRole)

          if (mode === 'register') {
            if (wantedRole !== 'student') throw new Error('Only students can register in this demo.')
            if (existing) throw new Error('Account already exists. Please login.')

            const prefix = 's'
            const newUser = {
              id: idFromEmail(prefix, cleanEmail),
              role: wantedRole,
              name: String(name || '').trim() || 'Student',
              email: cleanEmail,
              password: cleanPassword,
            }
            setAuthUsers((prev) => [newUser, ...prev])
            const token = `token-${Date.now()}`
            const sessionUser = {
              id: newUser.id,
              role: newUser.role,
              name: newUser.name,
              email: newUser.email,
              token,
            }
            setUser(sessionUser)
            return sessionUser
          }

          // Login
          if (!existing) throw new Error('Invalid credentials.')
          if (existing.password !== cleanPassword) throw new Error('Invalid credentials.')

          const token = `token-${Date.now()}`
          const nextUser = {
            id: existing.id,
            role: existing.role,
            name: existing.name,
            email: existing.email,
            token,
          }
          setUser(nextUser)
          return nextUser
        } finally {
          setAuthLoading(false)
        }
      },
      logout: () => {
        localStorage.removeItem('slms_user')
        setUser(null)
      },
    }
  }, [authLoading, setAuthUsers, setUser, authUsers, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

