import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { formatCurrency, formatDate } from '../../utils/formatters'
import Badge from '../ui/Badge'

const CATEGORY_COLOR = {
  'Food & Dining':  'bg-brand/10   text-brand',
  'Transport':      'bg-success/10 text-success',
  'Housing':        'bg-warning/10 text-warning',
  'Shopping':       'bg-purple-500/10 text-purple-500',
  'Health':         'bg-danger/10  text-danger',
  'Entertainment':  'bg-orange-500/10 text-orange-500',
  'Income':         'bg-success/10 text-success',
  'Utilities':      'bg-cyan-500/10 text-cyan-500',
}

export default function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4 hover:bg-surface-hover transition-colors duration-100 group">

      {/* Description */}
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          txn.type === 'income' ? 'bg-success/10' : 'bg-danger/10'
        }`}>
          {txn.type === 'income'
            ? <ArrowDownLeft size={15} strokeWidth={2.5} className="text-success" />
            : <ArrowUpRight  size={15} strokeWidth={2.5} className="text-danger" />
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary truncate">{txn.description}</p>
          <p className="text-xs text-secondary mt-0.5 font-mono">{txn.id}</p>
        </div>
      </div>

      {/* Category */}
      <div className="hidden sm:block">
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLOR[txn.category] ?? 'bg-secondary/10 text-secondary'}`}>
          {txn.category}
        </span>
      </div>

      {/* Amount */}
      <div className="hidden sm:block">
        <p className={`text-sm font-semibold tabular-nums ${
          txn.type === 'income' ? 'text-success' : 'text-danger'
        }`}>
          {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
        </p>
      </div>

      {/* Status */}
      <div className="hidden sm:block">
        <Badge label={txn.status} variant={txn.status} />
      </div>

      {/* Date */}
      <div className="hidden sm:block">
        <p className="text-sm text-secondary">{formatDate(txn.date)}</p>
      </div>

      {/* Actions menu */}
      <div className="relative flex justify-end" ref={menuRef}>
        {isAdmin ? (
          <>
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-hover opacity-0 group-hover:opacity-100 transition-all duration-150"
            >
              <MoreHorizontal size={15} strokeWidth={2} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 w-36 bg-surface border border-border rounded-2xl shadow-soft dark:shadow-none z-20 overflow-hidden animate-in">
                <button
                  onClick={() => { onEdit(txn); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
                >
                  <Pencil size={13} strokeWidth={2} />
                  Edit
                </button>
                <button
                  onClick={() => { onDelete(txn.id); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors"
                >
                  <Trash2 size={13} strokeWidth={2} />
                  Delete
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-8" /> // spacer for alignment
        )}
      </div>
    </div>
  )
}