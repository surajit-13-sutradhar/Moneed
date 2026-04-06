import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppShell() {
  return (
    <div className="flex h-screen bg-app overflow-hidden">
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300 ml-0 md:ml-[var(--sidebar-width)]"
      >
        <TopBar />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-8"
          style={{ marginTop: 'var(--topbar-height)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}