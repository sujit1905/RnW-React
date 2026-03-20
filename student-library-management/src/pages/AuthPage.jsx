import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useLibrary } from '../context/LibraryContext'
import Card from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { FiBookOpen, FiClock, FiShield, FiLayout, FiLogIn, FiUserPlus, FiUser, FiBriefcase } from 'react-icons/fi'

const MotionDiv = motion.div

function Segmented({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-1 justify-center items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              active
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-white/10'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            <opt.icon className="h-4 w-4" />
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function AuthPage() {
  const navigate = useNavigate()
  const { user, login, authLoading } = useAuth()
  const { ensureStudent } = useLibrary()

  const [role, setRole] = useState('student')
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const title = useMemo(() => {
    if (role === 'librarian') return 'Librarian Portal'
    return 'Student Portal'
  }, [role])

  useEffect(() => {
    if (!user) return
    navigate(user.role === 'librarian' ? '/librarian/dashboard' : '/student/dashboard', { replace: true })
  }, [navigate, user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email.trim()) {
      toast.error('Please enter your email.')
      return
    }
    if (!form.password.trim()) {
      toast.error('Please enter your password.')
      return
    }

    if (role === 'student' && !form.name.trim() && mode === 'register') {
      toast.error('Please enter your name.')
      return
    }

    try {
      const nextUser = await login({
        role,
        name: form.name || 'Student',
        email: form.email,
        password: form.password,
        mode,
      })

      if (nextUser.role === 'student') {
        ensureStudent({ ...nextUser })
      }

      toast.success(`Welcome back, ${nextUser.name.split(' ')[0]}!`)
      navigate(nextUser.role === 'librarian' ? '/librarian/dashboard' : '/student/dashboard', { replace: true })
    } catch (err) {
      toast.error(err?.message || 'Could not sign in.')
    }
  }

  return (
    <div className="h-[100svh] overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex items-center px-4 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="flex flex-col gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                v2.0 Premium
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                {title.split(' ')[0]} <span className="text-slate-500 dark:text-slate-400">{title.split(' ')[1]}</span>
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Experience library management reimagined. A seamless, high-performance interface for modern academic environments.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:ring-white/5">
                <div className="text-sm font-bold text-slate-900 dark:text-white">Premium Design</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Minimalist aesthetics with precision spacing and human-generated micro-animations.
                </div>
              </div>
              <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:ring-white/5">
                <div className="text-sm font-bold text-slate-900 dark:text-white">Smart Logic</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Instant state updates with local persistence and intuitive admin workflows.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:bg-slate-800/30 dark:ring-white/5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <FiShield className="text-slate-500 dark:text-slate-400" /> Key Features
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { icon: FiBookOpen, text: 'Issue & return books in seconds' },
                  { icon: FiClock, text: 'Automated tracking of due dates' },
                  { icon: FiLayout, text: 'Intuitive librarian dashboard' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className={`grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/5`}>
                      <item.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="relative overflow-hidden p-5 sm:p-6" variant="solid">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_0%_0%,rgba(100,116,139,0.06),transparent_70%)]" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-600 dark:text-white/70">Authentication</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{mode === 'login' ? 'Login' : 'Register'}</div>
              </div>

              <div className="w-full sm:w-auto">
                {role === 'student' ? (
                  <Segmented
                    value={mode}
                    onChange={setMode}
                    options={[
                      { value: 'login', label: 'Login', icon: FiLogIn },
                      { value: 'register', label: 'Register', icon: FiUserPlus },
                    ]}
                  />
                ) : (
                  <div className="flex h-[42px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-900/5">
                    <FiShield className="mr-2 text-slate-500" /> Admin Access
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex w-full">
              <Segmented
                value={role}
                onChange={(r) => {
                  setRole(r)
                  if (r === 'librarian') {
                    setMode('login')
                  }
                  setForm((f) => ({ ...f, email: '', password: '' }))
                }}
                options={[
                  { value: 'student', label: 'Student', icon: FiUser },
                  { value: 'librarian', label: 'Librarian', icon: FiBriefcase },
                ]}
              />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3" autoComplete="off">
              <AnimatePresence mode="wait">
                {role === 'student' && mode === 'register' ? (
                  <MotionDiv
                    key="student-name"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Name</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Ava Johnson"
                      autoComplete="off"
                      name="name_disabled_autofill"
                    />
                  </MotionDiv>
                ) : null}
              </AnimatePresence>

              <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Email</label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder={role === 'librarian' ? 'admin@library.com' : 'you@school.com'}
                  autoComplete="off"
                  name="email_disabled_autofill"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700/70 dark:text-white/70">Password</label>
                <Input
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder={role === 'librarian' ? 'admin123' : '(mock) anything'}
                  type="password"
                  autoComplete="new-password"
                  name="password_disabled_autofill"
                />
              </div>

              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? 'Signing in...' : mode === 'login' ? 'Login' : 'Create Account'}
              </Button>

              <div className="text-xs leading-relaxed text-slate-600/70 dark:text-white/60">
                {role === 'librarian'
                  ? 'Admin access requires predefined credentials. (Email: admin@library.com, Pass: admin123)'
                  : "By continuing, you agree to this demo's terms."}
              </div>
            </form>
          </Card>

          <div className="mt-3 text-center text-xs text-slate-600/70 dark:text-white/60">
            Already signed in? We’ll take you to your dashboard.
          </div>
        </div>
      </div>
    </div>
  )
}

