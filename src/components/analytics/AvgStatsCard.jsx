import { Activity } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import InsightCard from './InsightCard'

export default function AvgStatsCard({ avgMonthlyIncome, avgMonthlyExpense, avgSavingsRate }) {
  const stats = [
    {
      label: 'Avg monthly income',
      value: formatCurrency(avgMonthlyIncome),
      color: 'text-success',
    },
    {
      label: 'Avg monthly expenses',
      value: formatCurrency(avgMonthlyExpense),
      color: 'text-danger',
    },
    {
      label: 'Avg savings rate',
      value: `${avgSavingsRate.toFixed(1)}%`,
      color: avgSavingsRate >= 20 ? 'text-success' : avgSavingsRate >= 10 ? 'text-warning' : 'text-danger',
    },
  ]

  return (
    <InsightCard
      icon={Activity}
      iconBg="bg-success/10"
      iconColor="text-success"
      title="Average performance"
      subtitle="Across all recorded months"
    >
      <div className="space-y-2.5">
        {stats.map(s => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-xs text-secondary">{s.label}</span>
            <span className={`text-sm font-bold tabular-nums ${s.color}`}>{s.value}</span>
          </div>
        ))}

        {/* Savings rate visual bar */}
        <div className="pt-1">
          <div className="flex justify-between text-xs text-secondary mb-1.5">
            <span>Savings efficiency</span>
            <span>{avgSavingsRate.toFixed(1)}%</span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, avgSavingsRate)}%`,
                background: avgSavingsRate >= 20
                  ? '#16A34A'
                  : avgSavingsRate >= 10
                  ? '#EAB308'
                  : '#EF4444',
              }}
            />
          </div>
        </div>
      </div>
    </InsightCard>
  )
}