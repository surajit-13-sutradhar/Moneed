export default function InsightCard({ icon: Icon, iconBg, iconColor, title, subtitle, children }) {
  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon size={18} strokeWidth={2} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-primary">{title}</p>
          {subtitle && <p className="text-xs text-secondary mt-0.5">{subtitle}</p>}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </div>
  )
}