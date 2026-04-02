import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { Link } from 'react-router-dom'

const CATEGORY_INITIALS = (cat) => cat.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

const STATUS_STYLE = {
  completed: 'bg-success/10 text-success',
  pending:   'bg-warning/10 text-warning',
  failed:    'bg-danger/10  text-danger',
}

export default function RecentTransactions({ transactions }) {
  const recent = transactions.slice(0, 6)

  if (!recent.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-secondary gap-2">
        <Clock size={28} strokeWidth={1.5} className="opacity-40" />
        <p className="text-sm">No transactions yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {recent.map(txn => (
        <div
          key={txn.id}
          className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-surface-hover transition-colors duration-100 cursor-pointer group"
        >
          {/* Icon */}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
            txn.type === 'income'
              ? 'bg-success/10 text-success'
              : 'bg-danger/10 text-danger'
          }`}>
            {txn.type === 'income'
              ? <ArrowDownLeft size={16} strokeWidth={2.5} />
              : <ArrowUpRight  size={16} strokeWidth={2.5} />
            }
          </div>

          {/* Description */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">{txn.description}</p>
            <p className="text-xs text-secondary mt-0.5">{txn.category} · {formatDate(txn.date)}</p>
          </div>

          {/* Status badge */}
          <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[txn.status] ?? STATUS_STYLE.completed}`}>
            {txn.status}
          </span>

          {/* Amount */}
          <p className={`text-sm font-semibold tabular-nums flex-shrink-0 ${
            txn.type === 'income' ? 'text-success' : 'text-danger'
          }`}>
            {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
          </p>
        </div>
      ))}

      <div className="pt-2">
        <Link
          to="/transactions"
          className="flex items-center justify-center gap-1.5 w-full h-9 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150"
        >
          View all transactions
          <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}