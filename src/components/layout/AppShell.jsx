import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell() {
  return (
    <div className="flex h-screen bg-app overflow-hidden">
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        <Topbar />
        <main
          className="flex-1 overflow-y-auto p-8"
          style={{ marginTop: 'var(--topbar-height)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}