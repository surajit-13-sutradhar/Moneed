import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart2,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react'

export const NAV = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight  },
  { to: '/analytics',    label: 'Analytics',    icon: BarChart2       },
  { to: '/settings',     label: 'Settings',     icon: Settings        },
]

export default function Sidebar() {
  const { state, dispatch } = useApp()

  return (
    <aside
      className="fixed top-0 left-0 h-full bg-surface border-r border-border hidden md:flex flex-col z-40"
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 border-b border-border flex-shrink-0" style={{ height: 'var(--topbar-height)' }}>
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 11L8 4L13 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight text-primary">Moneed</span>
      </div>

      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-surface-hover'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Upgrade card ─────────────────────────────────── */}
      <div className="px-3 pb-3">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-brand/10 to-brand/5 border border-brand/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-brand/15 flex items-center justify-center">
              <Zap size={13} className="text-brand" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-brand">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-secondary mb-3 leading-relaxed">
            Unlock unlimited budgets, advanced exports, and AI insights.
          </p>
          <button className="w-full h-8 rounded-full bg-brand text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all duration-150">
            Upgrade now
          </button>
        </div>
      </div>

      {/* ── Log out ──────────────────────────────────────── */}
      <div className="px-3 pb-5 pt-2 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-danger hover:bg-danger/10 transition-colors duration-150 w-full">
          <LogOut size={17} strokeWidth={1.8} />
          Log Out
        </button>
      </div>
    </aside>
  )
}