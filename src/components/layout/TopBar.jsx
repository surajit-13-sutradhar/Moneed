import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
  Menu,
  X
} from 'lucide-react'
import { NAV } from './Sidebar'

const NOTIF_ICON = {
  income: { icon: TrendingUp, bg: 'bg-success/10', color: 'text-success' },
  warning: { icon: AlertTriangle, bg: 'bg-warning/10', color: 'text-warning' },
  expense: { icon: TrendingDown, bg: 'bg-danger/10', color: 'text-danger' },
}

export default function Topbar() {
  const { state, dispatch } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const notifRef = useRef(null)
  const roleRef = useRef(null)

  const unreadCount = state.notifications.filter(n => !n.read).length

  // Close dropdowns on outside click and mobile menu on resize
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleOpen(false)
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' })

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role })
    setRoleOpen(false)
  }

  return (
    <header
      className="fixed top-0 right-0 bg-surface border-b border-border z-30 flex justify-between items-center px-4 md:px-8 gap-4 md:gap-6 left-0 md:left-[var(--sidebar-width)] transition-all duration-300"
      style={{ height: 'var(--topbar-height)' }}
    >
      {/* ── Search & Hamburger ───────────────────────────── */}
      <div className="flex-1 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 px-4 h-9 rounded-full border border-border bg-app text-secondary text-sm cursor-pointer hover:border-brand/40 transition-colors duration-150 w-full max-w-sm">
          <Search size={14} strokeWidth={2} />
          <span className="flex-1 select-none whitespace-nowrap overflow-hidden text-ellipsis">Search transactions…</span>
          <kbd className="hidden sm:inline-block text-xs bg-surface border border-border rounded-md px-1.5 py-0.5 font-mono leading-none">
            ⌘K
          </kbd>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-surface-hover flex-shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Right cluster ────────────────────────────────── */}
      <div
        className={`flex-shrink-0 ${mobileMenuOpen
            ? 'flex absolute top-[var(--topbar-height)] left-0 w-full flex-col bg-surface border-b border-border p-4 shadow-md animate-in md:static md:w-auto md:flex-row md:items-center md:gap-2 md:p-0 md:border-none md:shadow-none md:bg-transparent'
            : 'hidden md:flex items-center gap-2'
          }`}
      >

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-1 w-full border-b border-border pb-4 mb-4 md:hidden">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-150 ${isActive
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
        )}

        {/* Action items */}
        <div className="flex items-center gap-2 w-full justify-between md:justify-end md:w-auto">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-hover transition-all duration-150"
            title={state.theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {state.theme === 'dark'
              ? <Sun size={16} strokeWidth={1.8} />
              : <Moon size={16} strokeWidth={1.8} />
            }
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(p => !p)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-hover transition-all duration-150 relative"
            >
              <Bell size={16} strokeWidth={1.8} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-surface" />
              )}
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-3xl shadow-soft dark:shadow-none z-50 overflow-hidden animate-in">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-primary">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand/10 text-brand">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'MARK_ALL_READ' })}
                    className="text-xs text-brand hover:opacity-75 transition-opacity font-medium"
                  >
                    Mark all read
                  </button>
                </div>

                {/* List */}
                <div className="divide-y divide-border max-h-72 overflow-y-auto">
                  {state.notifications.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <Bell size={24} className="text-secondary mx-auto mb-2 opacity-40" />
                      <p className="text-sm text-secondary">No notifications</p>
                    </div>
                  ) : (
                    state.notifications.map(n => {
                      const cfg = NOTIF_ICON[n.icon] ?? NOTIF_ICON.expense
                      const Icon = cfg.icon
                      return (
                        <div
                          key={n.id}
                          onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id })}
                          className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors duration-100 ${n.read ? 'hover:bg-surface-hover' : 'bg-brand/[0.03] hover:bg-brand/[0.06]'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                            <Icon size={14} className={cfg.color} strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary leading-snug">{n.title}</p>
                            <p className="text-xs text-secondary mt-0.5 leading-relaxed">{n.message}</p>
                            <p className="text-xs text-secondary/50 mt-1">{n.time}</p>
                          </div>
                          {!n.read && (
                            <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-border mx-1" />

          {/* Role switcher */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleOpen(p => !p)}
              className="flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-surface text-sm font-medium text-primary hover:bg-surface-hover transition-colors duration-150"
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${state.role === 'admin' ? 'bg-brand' : 'bg-success'
                  }`}
              />
              <span className="capitalize">{state.role}</span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`text-secondary transition-transform duration-150 ${roleOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {roleOpen && (
              <div className="absolute right-0 top-11 w-40 bg-surface border border-border rounded-2xl shadow-soft dark:shadow-none z-50 overflow-hidden">
                {['admin', 'viewer'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors duration-100 ${state.role === r
                        ? 'text-brand bg-brand/5'
                        : 'text-secondary hover:text-primary hover:bg-surface-hover'
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${r === 'admin' ? 'bg-brand' : 'bg-success'}`} />
                    <span className="capitalize">{r}</span>
                    {state.role === r && (
                      <span className="ml-auto text-brand">✓</span>
                    )}
                  </button>
                ))}

                <div className="border-t border-border px-4 py-2.5">
                  <p className="text-xs text-secondary leading-relaxed">
                    {state.role === 'admin'
                      ? 'Full access — can add & edit transactions.'
                      : 'Read-only — viewing data only.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white tracking-wide">MN</span>
          </div>
        </div>

      </div>
    </header>
  )
}