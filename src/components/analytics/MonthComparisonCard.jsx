import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import InsightCard from './InsightCard'

const Delta = ({ value, label }) => {
  const isUp   = value > 0.5
  const isDown = value < -0.5
  const Icon   = isUp ? TrendingUp : isDown ? TrendingDown : Minus
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${
      isUp ? 'text-danger' : isDown ? 'text-success' : 'text-secondary'
    }`}>
      <Icon size={12} strokeWidth={2.5} />
      {Math.abs(value).toFixed(1)}% {label}
    </div>
  )
}

export default function MonthComparisonCard({ monthOverMonth }) {
  if (!monthOverMonth) return null
  const { current, previous, expenseChange, incomeChange } = monthOverMonth

  const rows = [
    {
      label: 'Income',
      current:  current.income,
      previous: previous.income,
      change:   incomeChange,
      positive: true,
    },
    {
      label: 'Expenses',
      current:  current.expenses,
      previous: previous.expenses,
      change:   expenseChange,
      positive: false,
    },
    {
      label: 'Net saved',
      current:  current.income  - current.expenses,
      previous: previous.income - previous.expenses,
      change:   previous.income - previous.expenses > 0
        ? (((current.income - current.expenses) - (previous.income - previous.expenses)) /
           Math.abs(previous.income - previous.expenses)) * 100
        : 0,
      positive: true,
    },
  ]

  return (
    <InsightCard
      icon={TrendingUp}
      iconBg="bg-brand/10"
      iconColor="text-brand"
      title="Month over month"
      subtitle={`${previous.label} → ${current.label}`}
    >
      <div className="space-y-3">
        {rows.map(row => (
          <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
            <div>
              <p className="text-xs text-secondary mb-0.5">{row.label}</p>
              <p className="text-sm font-semibold text-primary tabular-nums">
                {formatCurrency(row.current)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-secondary mb-0.5 tabular-nums">
                prev. {formatCurrency(row.previous)}
              </p>
              <Delta value={row.change} label="change" />
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  )
}