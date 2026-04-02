import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-2xl px-4 py-3 shadow-soft dark:shadow-none">
      <p className="text-xs font-medium text-secondary mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-secondary capitalize">{p.name}:</span>
          <span className="font-semibold text-primary">
            ${p.value.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrendChart({ data }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-56 text-secondary text-sm">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#16A34A" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border-color))" vertical={false} />

        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: 'rgb(var(--text-secondary))', fontFamily: 'Outfit' }}
          axisLine={false}
          tickLine={false}
          dy={8}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgb(var(--text-secondary))', fontFamily: 'Outfit' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          formatter={(value) => (
            <span style={{ fontSize: 12, color: 'rgb(var(--text-secondary))', fontFamily: 'Outfit' }}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: '12px' }}
        />

        <Area
          type="monotone"
          dataKey="income"
          name="income"
          stroke="#16A34A"
          strokeWidth={2}
          fill="url(#gradIncome)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="expenses"
          stroke="#EF4444"
          strokeWidth={2}
          fill="url(#gradExpense)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}