import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LibraryProvider } from './context/LibraryContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LibraryProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2600,
                style: {
                  background: 'rgba(17, 24, 39, 0.82)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                },
                success: { style: { borderColor: 'rgba(52, 211,153,0.35)' } },
                error: { style: { borderColor: 'rgba(244, 63, 94,0.45)' } },
              }}
            />
          </BrowserRouter>
        </LibraryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
