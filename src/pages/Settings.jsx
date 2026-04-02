import { useApp } from '../context/AppContext'
import { mockTransactions } from '../data/mockData'
import { Sun, Moon, Shield, Eye, Trash2, RotateCcw, Info } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'

export default function Settings() {
  const { state, dispatch } = useApp()
  const { theme, role } = state

  const handleReset = () => {
    if (window.confirm('Reset all transactions to the original mock data?')) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions })
    }
  }

  const handleClear = () => {
    if (window.confirm('This will permanently delete ALL transactions. Continue?')) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] })
    }
  }

  const Row = ({ label, subtitle, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-primary">{label}</p>
        {subtitle && <p className="text-xs text-secondary mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex-shrink-0 ml-6">{children}</div>
    </div>
  )

  const Section = ({ title, children }) => (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none mb-4">
      <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">{title}</h2>
      {children}
    </div>
  )

  return (
    <div>
      <SectionHeader
        title="Settings"
        subtitle="Manage your preferences and application data."
      />

      <div className="max-w-2xl space-y-4">

        {/* Appearance */}
        <Section title="Appearance">
          <Row
            label="Theme"
            subtitle="Switch between light and dark mode"
          >
            <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-app">
              {['light', 'dark'].map(t => (
                <button
                  key={t}
                  onClick={() => dispatch({ type: 'SET_THEME', payload: t })}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    theme === t
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {t === 'light' ? <Sun size={12} strokeWidth={2} /> : <Moon size={12} strokeWidth={2} />}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </Row>
        </Section>

        {/* Role */}
        <Section title="Role & Access">
          <Row
            label="Current role"
            subtitle="Controls what actions you can perform in the app"
          >
            <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-app">
              {[
                { value: 'admin',  icon: Shield, label: 'Admin'  },
                { value: 'viewer', icon: Eye,    label: 'Viewer' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => dispatch({ type: 'SET_ROLE', payload: value })}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    role === value
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <Icon size={12} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </Row>

          <div className={`mt-2 flex items-start gap-2 px-4 py-3 rounded-2xl text-xs leading-relaxed ${
            role === 'admin'
              ? 'bg-brand/5 text-brand border border-brand/15'
              : 'bg-success/5 text-success border border-success/15'
          }`}>
            <Info size={13} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
            {role === 'admin'
              ? 'Admin role: you can add, edit, and delete transactions. All features are unlocked.'
              : 'Viewer role: read-only access. Add, edit, and delete actions are hidden throughout the app.'}
          </div>
        </Section>

        {/* Data */}
        <Section title="Data Management">
          <Row
            label="Reset transactions"
            subtitle="Restore all transactions to the original mock dataset"
          >
            <button
              onClick={handleReset}
              className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150"
            >
              <RotateCcw size={13} strokeWidth={2} />
              Reset
            </button>
          </Row>
          <Row
            label="Clear all data"
            subtitle="Permanently delete every transaction record"
          >
            <button
              onClick={handleClear}
              className="flex items-center gap-2 h-9 px-4 rounded-full border border-danger/30 text-sm font-medium text-danger hover:bg-danger/5 transition-colors duration-150"
            >
              <Trash2 size={13} strokeWidth={2} />
              Clear all
            </button>
          </Row>
        </Section>

        {/* About */}
        <Section title="About">
          <div className="space-y-1 py-1">
            {[
              ['App',      'Moneed Finance Dashboard'],
              ['Version',  '1.0.0'],
              ['Stack',    'React + Tailwind + Recharts + Lucide'],
              ['Role',     state.role.charAt(0).toUpperCase() + state.role.slice(1)],
              ['Theme',    state.theme.charAt(0).toUpperCase() + state.theme.slice(1)],
              ['Records',  `${state.transactions.length} transactions`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 text-sm">
                <span className="text-secondary">{k}</span>
                <span className="font-medium text-primary">{v}</span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}