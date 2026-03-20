import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import LandingPage from '../pages/LandingPage'
import AuthPage from '../pages/AuthPage'
import StudentDashboard from '../pages/student/StudentDashboard'
import MyBooks from '../pages/student/MyBooks'
import LibrarianLayout from '../pages/librarian/LibrarianLayout'
import LibrarianDashboard from '../pages/librarian/LibrarianDashboard'
import LibrarianAddBook from '../pages/librarian/LibrarianAddBook'
import LibrarianBooks from '../pages/librarian/LibrarianBooks'
import LibrarianIssued from '../pages/librarian/LibrarianIssued'

const MotionDiv = motion.div

function PageTransition({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={location.pathname}
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <LandingPage />
          </PageTransition>
        }
      />
      <Route
        path="/auth"
        element={
          <PageTransition>
            <AuthPage />
          </PageTransition>
        }
      />

      <Route element={<RequireAuth role="student" />}>
        <Route
          path="/student/dashboard"
          element={
            <PageTransition>
              <StudentDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/student/my-books"
          element={
            <PageTransition>
              <MyBooks />
            </PageTransition>
          }
        />
      </Route>

      <Route element={<RequireAuth role="librarian" />}>
        <Route path="/librarian" element={<LibrarianLayout />}>
          <Route
            index
            element={<Navigate to="/librarian/dashboard" replace />}
          />
          <Route
            path="dashboard"
            element={
              <PageTransition>
                <LibrarianDashboard />
              </PageTransition>
            }
          />
          <Route
            path="add"
            element={
              <PageTransition>
                <LibrarianAddBook />
              </PageTransition>
            }
          />
          <Route
            path="books"
            element={
              <PageTransition>
                <LibrarianBooks />
              </PageTransition>
            }
          />
          <Route
            path="issued"
            element={
              <PageTransition>
                <LibrarianIssued />
              </PageTransition>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

