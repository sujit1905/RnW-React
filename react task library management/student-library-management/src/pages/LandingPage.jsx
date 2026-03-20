import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Preloader from '../components/Preloader'
import { useAuth } from '../context/AuthContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { user, authLoading } = useAuth()

  useEffect(() => {
    const t = setTimeout(() => {
      if (user) {
        navigate(user.role === 'librarian' ? '/librarian/dashboard' : '/student/dashboard', { replace: true })
      } else {
        navigate('/auth', { replace: true })
      }
    }, 1600)
    return () => clearTimeout(t)
  }, [navigate, user])

  if (authLoading) return null

  return <Preloader text="Student Library Management" />
}

