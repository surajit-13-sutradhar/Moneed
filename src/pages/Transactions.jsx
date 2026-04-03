import { useMemo, useState } from 'react'
import { Plus, Download, FileJson } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getFilteredTransactions, exportToCSV, exportToJSON } from '../utils/aggregations'
import { formatCurrency } from '../utils/formatters'
import SectionHeader        from '../components/ui/SectionHeader'
import TransactionFilters   from '../components/transactions/TransactionFilters'
import TransactionRow       from '../components/transactions/TransactionRow'
import TransactionModal     from '../components/transactions/TransactionModal'

const TABLE_HEADERS = ['Description', 'Category', 'Amount', 'Status', 'Date', '']

export default function Transactions() {
  const { state, dispatch } = useApp()
  const { transactions, filters, role } = state
  const isAdmin = role === 'admin'

  const [modalOpen, setModalOpen] = useState(false)
  const [editTxn,   setEditTxn]   = useState(null)

  const filtered = useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters]
  )

  const openAdd  = () => { setEditTxn(null); setModalOpen(true) }
  const openEdit = (txn) => { setEditTxn(txn); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditTxn(null) }

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }
  }

  return (
    <div>
      <SectionHeader
        title="Transactions"
        subtitle="View, filter, and manage all your financial activity in one place."
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(filtered)}
              className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150"
            >
              <Download size={14} strokeWidth={2} />
              Export CSV
            </button>
            <button
              onClick={() => exportToJSON(filtered)}
              className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150"
            >
              <FileJson size={14} strokeWidth={2} />
              Export JSON
            </button>
            {isAdmin && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 h-9 px-4 rounded-full bg-brand text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
              >
                <Plus size={14} strokeWidth={2.5} />
                Add Transaction
              </button>
            )}
          </div>
        }
      />

      {/* Filters */}
      <div className="bg-surface border border-border rounded-3xl p-5 shadow-soft dark:shadow-none mb-5">
        <TransactionFilters resultCount={filtered.length} />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-3xl shadow-soft dark:shadow-none overflow-hidden">

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border">
          {TABLE_HEADERS.map((h, i) => (
            <p key={i} className="text-xs font-semibold text-secondary uppercase tracking-wide">
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 rounded-full bg-surface-hover flex items-center justify-center">
              <FileJson size={24} strokeWidth={1.5} className="text-secondary opacity-50" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-primary">No transactions found</p>
              <p className="text-xs text-secondary mt-1">Try adjusting your filters or add a new transaction.</p>
            </div>
            {isAdmin && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 h-9 px-5 rounded-full bg-brand text-white text-sm font-medium mt-1 hover:opacity-90 active:scale-95 transition-all"
              >
                <Plus size={14} strokeWidth={2.5} />
                Add Transaction
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(txn => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-app/50">
            <p className="text-xs text-secondary">
              {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} ·{' '}
              Total expenses:{' '}
              <span className="font-medium text-danger">
                {formatCurrency(filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
              </span>
              {' '}· Total income:{' '}
              <span className="font-medium text-success">
                {formatCurrency(filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0))}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        editTxn={editTxn}
      />
    </div>
  )
}