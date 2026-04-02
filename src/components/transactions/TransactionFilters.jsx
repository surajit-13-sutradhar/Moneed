import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

export default function TransactionFilters({ resultCount }) {
  const { state, dispatch } = useApp()
  const { filters } = state

  const set = (key, value) => dispatch({ type: 'SET_FILTER', payload: { [key]: value } })
  const hasActiveFilters =
    filters.search     !== '' ||
    filters.category   !== 'all' ||
    filters.type       !== 'all' ||
    filters.status     !== 'all' ||
    filters.sortBy     !== 'date-desc'

  const selectClass =
    'h-9 pl-3 pr-8 rounded-full border border-border bg-surface text-sm text-primary ' +
    'focus:outline-none focus:border-brand cursor-pointer hover:bg-surface-hover ' +
    'transition-colors duration-150 appearance-none'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="flex items-center gap-2.5 px-4 h-9 rounded-full border border-border bg-surface text-sm flex-1 min-w-48 focus-within:border-brand transition-colors duration-150">
          <Search size={14} strokeWidth={2} className="text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, ID, or category…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
            className="flex-1 bg-transparent text-primary placeholder:text-secondary focus:outline-none text-sm"
          />
          {filters.search && (
            <button onClick={() => set('search', '')} className="text-secondary hover:text-primary">
              <X size={13} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={e => set('category', e.target.value)}
            className={selectClass}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <SlidersHorizontal size={12} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>

        {/* Type */}
        <div className="relative">
          <select
            value={filters.type}
            onChange={e => set('type', e.target.value)}
            className={selectClass}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <SlidersHorizontal size={12} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={e => set('status', e.target.value)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <SlidersHorizontal size={12} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={e => set('sortBy', e.target.value)}
            className={selectClass}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
          </select>
          <ArrowUpDown size={12} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="flex items-center gap-1.5 h-9 px-4 rounded-full border border-border text-sm font-medium text-secondary hover:text-danger hover:border-danger/40 transition-colors duration-150"
          >
            <X size={13} strokeWidth={2.5} />
            Reset
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-secondary px-1">
        Showing <span className="font-medium text-primary">{resultCount}</span> transaction{resultCount !== 1 ? 's' : ''}
        {hasActiveFilters && ' (filtered)'}
      </p>
    </div>
  )
}