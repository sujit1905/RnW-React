import { Outlet, useLocation } from 'react-router-dom'
import PageFrame from '../../components/layout/PageFrame'
import Sidebar from '../../components/layout/Sidebar'
import TopBar from '../../components/layout/TopBar'

export default function LibrarianLayout() {
  const location = useLocation()

  const subtitleMap = {
    dashboard: 'Overview, stats, and quick actions.',
    add: 'Add new books to the catalog.',
    books: 'View and manage all books.',
    issued: 'Track which student has which book.',
  }
  const section = location.pathname.split('/')[2] || 'dashboard'

  return (
    <PageFrame>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <Sidebar className="lg:w-72" />
        <main className="min-w-0 flex-1">
          <div className="lg:hidden">
            <TopBar title="Librarian" subtitle={subtitleMap[section] || 'Manage library'} />
          </div>
          <div className="mt-6 lg:mt-0">
            <Outlet />
          </div>
        </main>
      </div>
    </PageFrame>
  )
}

