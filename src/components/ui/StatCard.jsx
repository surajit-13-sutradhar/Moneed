import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconBg = 'bg-brand/10',
  iconColor = 'text-brand',
  accent = false,
}) {
  const isPositive = change >= 0
  const showChange = change !== undefined && change !== null

  return (
    <div
      className={`rounded-3xl p-6 border transition-shadow duration-200 hover:shadow-md ${
        accent
          ? 'bg-brand border-brand text-white'
          : 'bg-surface border-border shadow-soft dark:shadow-none'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <p className={`text-sm font-medium ${accent ? 'text-white/70' : 'text-secondary'}`}>
          {title}
        </p>
        {Icon && (
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            accent ? 'bg-white/15' : iconBg
          }`}>
            <Icon size={16} strokeWidth={2} className={accent ? 'text-white' : iconColor} />
          </div>
        )}
      </div>

      <p
        className={`font-bold tracking-tight leading-none mb-3 ${
          accent ? 'text-white' : 'text-primary'
        }`}
        style={{ fontSize: '1.875rem' }}
      >
        {value}
      </p>

      {showChange && (
        <div className="flex items-center gap-1.5">
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              accent
                ? isPositive ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
                : isPositive
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'
            }`}
          >
            {isPositive
              ? <TrendingUp size={11} strokeWidth={2.5} />
              : <TrendingDown size={11} strokeWidth={2.5} />
            }
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className={`text-xs ${accent ? 'text-white/60' : 'text-secondary'}`}>
            {changeLabel}
          </span>
        </div>
      )}
    </div>
  )
}