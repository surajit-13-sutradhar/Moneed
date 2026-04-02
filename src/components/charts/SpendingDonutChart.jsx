import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-surface border border-border rounded-2xl px-4 py-3 shadow-soft dark:shadow-none">
      <p className="text-sm font-semibold text-primary">{d.name}</p>
      <p className="text-sm text-secondary mt-0.5">{formatCurrency(d.value)}</p>
      <p className="text-xs text-secondary mt-0.5">{d.percentage.toFixed(1)}% of total</p>
    </div>
  )
}

export default function SpendingDonutChart({ data }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-48 text-secondary text-sm">
        No spending data
      </div>
    )
  }

  const topCategories = data.slice(0, 5)

  return (
    <div className="flex flex-col gap-4">
      {/* Donut */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={topCategories}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {topCategories.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2.5">
        {topCategories.map((cat, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: cat.color }}
            />
            <span className="text-sm text-secondary flex-1 truncate">{cat.name}</span>
            <span className="text-sm font-medium text-primary tabular-nums">
              {formatCurrency(cat.value)}
            </span>
            <span className="text-xs text-secondary w-10 text-right tabular-nums">
              {cat.percentage.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}