import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const EMPTY_FORM = {
  description: '',
  category: 'Food & Dining',
  type: 'expense',
  amount: '',
  status: 'completed',
  date: new Date().toISOString().split('T')[0],
}

export default function TransactionModal({ isOpen, onClose, editTxn = null }) {
  const { state, dispatch } = useApp()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTxn) {
      setForm({
        description: editTxn.description,
        category:    editTxn.category,
        type:        editTxn.type,
        amount:      String(editTxn.amount),
        status:      editTxn.status,
        date:        editTxn.date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editTxn, isOpen])

  if (!isOpen) return null

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const txnData = {
      ...form,
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
    }

    if (editTxn) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: { ...editTxn, ...txnData } })
    } else {
      const newId = `TXN-${String(state.transactions.length + 1).padStart(3, '0')}`
      dispatch({ type: 'ADD_TRANSACTION', payload: { id: newId, ...txnData } })
    }
    onClose()
  }

  const inputClass = (field) =>
    `w-full h-10 px-4 rounded-2xl border text-sm text-primary bg-app focus:outline-none transition-colors duration-150 ${
      errors[field]
        ? 'border-danger focus:border-danger'
        : 'border-border focus:border-brand'
    }`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-surface border border-border rounded-3xl w-full max-w-md shadow-2xl animate-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-primary">
              {editTxn ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              {editTxn ? `Editing ${editTxn.id}` : 'Add a new transaction to your records'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-secondary block mb-1.5">Description</label>
            <input
              type="text"
              placeholder="e.g. Netflix subscription"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className={inputClass('description')}
            />
            {errors.description && <p className="text-xs text-danger mt-1">{errors.description}</p>}
          </div>

          {/* Type + Amount row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-secondary block mb-1.5">Type</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value)}
                className={inputClass('type') + ' cursor-pointer'}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-secondary block mb-1.5">Amount ($)</label>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
                className={inputClass('amount')}
              />
              {errors.amount && <p className="text-xs text-danger mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-secondary block mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className={inputClass('category') + ' cursor-pointer'}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-secondary block mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value)}
                className={inputClass('status') + ' cursor-pointer'}
              >
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-secondary block mb-1.5">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              className={inputClass('date')}
            />
            {errors.date && <p className="text-xs text-danger mt-1">{errors.date}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-9 px-5 rounded-full bg-brand text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-150 flex items-center gap-2"
          >
            <Save size={14} strokeWidth={2} />
            {editTxn ? 'Save changes' : 'Add transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}