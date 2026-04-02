import { PiggyBank } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function SavingsCard({ savingsRate, thisMonthIncome, thisMonthExpenses }) {
  const saved = thisMonthIncome - thisMonthExpenses
  const clampedRate = Math.min(100, Math.max(0, savingsRate))

  const getColor = (rate) => {
    if (rate >= 30) return { stroke: '#16A34A', bg: 'bg-success/10', text: 'text-success' }
    if (rate >= 15) return { stroke: '#EAB308', bg: 'bg-warning/10', text: 'text-warning' }
    return { stroke: '#EF4444', bg: 'bg-danger/10', text: 'text-danger' }
  }

  const { stroke, bg, text } = getColor(clampedRate)

  // SVG arc for savings ring
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (clampedRate / 100) * circ

  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-secondary">Savings Rate</p>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${bg}`}>
          <PiggyBank size={16} strokeWidth={2} className={text} />
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Ring */}
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r={r} fill="none" stroke="rgb(var(--border-color))" strokeWidth="7" />
            <circle
              cx="44" cy="44" r={r}
              fill="none"
              stroke={stroke}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90 44 44)"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold text-primary tabular-nums">
              {clampedRate.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2.5">
          <div>
            <p className="text-xs text-secondary">Saved this month</p>
            <p className={`text-lg font-bold tabular-nums ${saved >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatCurrency(Math.abs(saved))}
            </p>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-xs text-secondary">
            <span>Income <span className="font-medium text-primary">{formatCurrency(thisMonthIncome, true)}</span></span>
            <span>Spent <span className="font-medium text-primary">{formatCurrency(thisMonthExpenses, true)}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}