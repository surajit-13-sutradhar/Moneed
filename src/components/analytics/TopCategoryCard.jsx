import { Trophy } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { CATEGORY_COLORS } from '../../data/mockData'
import InsightCard from './InsightCard'

export default function TopCategoryCard({ topCategory, breakdown }) {
  if (!topCategory) return null

  const total = breakdown.reduce((s, c) => s + c.value, 0)

  return (
    <InsightCard
      icon={Trophy}
      iconBg="bg-warning/10"
      iconColor="text-warning"
      title="Top spending category"
      subtitle="Where most of your money goes"
    >
      {/* Hero stat */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-bold text-primary">{topCategory.name}</p>
          <p className="text-2xl font-bold text-danger tabular-nums mt-0.5">
            {formatCurrency(topCategory.value)}
          </p>
        </div>
        <span className="text-2xl font-bold text-secondary/30 tabular-nums">
          {topCategory.percentage.toFixed(0)}%
        </span>
      </div>

      {/* Mini bar chart — all categories */}
      <div className="space-y-2">
        {breakdown.slice(0, 5).map(cat => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-secondary">{cat.name}</span>
              <span className="text-xs font-medium text-primary tabular-nums">
                {formatCurrency(cat.value)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${total > 0 ? (cat.value / total) * 100 : 0}%`,
                  background: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  )
}