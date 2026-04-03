import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
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
            ₹{p.value.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyBarChart({ data }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-56 text-secondary text-sm">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={4}>
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
          tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgb(var(--bg-surface-hover))' }} />
        <Legend
          formatter={value => (
            <span style={{ fontSize: 12, color: 'rgb(var(--text-secondary))', fontFamily: 'Outfit' }}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: '12px' }}
        />
        <Bar dataKey="income"   name="income"   fill="#16A34A" radius={[6, 6, 0, 0]} maxBarSize={32} />
        <Bar dataKey="expenses" name="expenses" fill="#EF4444" radius={[6, 6, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  )
}