import { mockTransactions, CATEGORY_COLORS } from '../data/mockData'

// ── Helpers ───────────────────────────────────────────────────────────

const getMonth = (dateStr) => dateStr.slice(0, 7) // "2026-01"

// ── Transaction selectors ─────────────────────────────────────────────

export function getFilteredTransactions(transactions, filters) {
  let result = [...transactions]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      t =>
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
  }

  if (filters.category !== 'all') {
    result = result.filter(t => t.category === filters.category)
  }

  if (filters.type !== 'all') {
    result = result.filter(t => t.type === filters.type)
  }

  if (filters.status && filters.status !== 'all') {
    result = result.filter(t => t.status === filters.status)
  }

  switch (filters.sortBy) {
    case 'date-desc':  result.sort((a, b) => new Date(b.date) - new Date(a.date)); break
    case 'date-asc':   result.sort((a, b) => new Date(a.date) - new Date(b.date)); break
    case 'amount-desc':result.sort((a, b) => b.amount - a.amount); break
    case 'amount-asc': result.sort((a, b) => a.amount - b.amount); break
    default: break
  }

  return result
}

// ── Summary stats ─────────────────────────────────────────────────────

export function getSummaryStats(transactions) {
  const now     = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonth = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`

  const thisMonthTxns = transactions.filter(t => getMonth(t.date) === thisMonth)
  const lastMonthTxns = transactions.filter(t => getMonth(t.date) === lastMonth)

  const totalIncome   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const totalBalance  = totalIncome - totalExpenses

  const thisIncome   = thisMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const thisExpenses = thisMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const lastIncome   = lastMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const lastExpenses = lastMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const incomeChange   = lastIncome   > 0 ? ((thisIncome   - lastIncome)   / lastIncome)   * 100 : 0
  const expensesChange = lastExpenses > 0 ? ((thisExpenses - lastExpenses) / lastExpenses) * 100 : 0

  const savingsRate = thisIncome > 0
    ? ((thisIncome - thisExpenses) / thisIncome) * 100
    : 0

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    thisMonthIncome:   thisIncome,
    thisMonthExpenses: thisExpenses,
    incomeChange,
    expensesChange,
    savingsRate,
  }
}

// ── Monthly trend (for area chart) ───────────────────────────────────

export function getMonthlyTrend(transactions) {
  const map = {}

  transactions.forEach(t => {
    const m = getMonth(t.date)
    if (!map[m]) map[m] = { month: m, income: 0, expenses: 0 }
    if (t.type === 'income')  map[m].income   += t.amount
    if (t.type === 'expense') map[m].expenses += t.amount
  })

  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(m => ({
      ...m,
      label: new Date(m.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      balance: m.income - m.expenses,
    }))
}

// ── Spending by category (for donut) ─────────────────────────────────

export function getCategoryBreakdown(transactions) {
  const map = {}

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!map[t.category]) map[t.category] = 0
      map[t.category] += t.amount
    })

  const total = Object.values(map).reduce((s, v) => s + v, 0)

  return Object.entries(map)
    .map(([name, value]) => ({
      name,
      value,
      percentage: total > 0 ? (value / total) * 100 : 0,
      color: CATEGORY_COLORS[name] ?? '#71717A',
    }))
    .sort((a, b) => b.value - a.value)
}

// ── Insights ──────────────────────────────────────────────────────────

export function getInsights(transactions) {
  const breakdown = getCategoryBreakdown(transactions)
  const monthly   = getMonthlyTrend(transactions)

  const topCategory = breakdown[0] ?? null

  const months = monthly.slice(-2)
  const monthOverMonth = months.length === 2
    ? {
        current:  months[1],
        previous: months[0],
        expenseChange: months[0].expenses > 0
          ? ((months[1].expenses - months[0].expenses) / months[0].expenses) * 100
          : 0,
        incomeChange: months[0].income > 0
          ? ((months[1].income - months[0].income) / months[0].income) * 100
          : 0,
      }
    : null

  const avgMonthlyExpense = monthly.length > 0
    ? monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length
    : 0

  const avgMonthlyIncome = monthly.length > 0
    ? monthly.reduce((s, m) => s + m.income, 0) / monthly.length
    : 0

  const avgSavingsRate = avgMonthlyIncome > 0
    ? ((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100
    : 0

  return {
    topCategory,
    categoryBreakdown: breakdown,
    monthOverMonth,
    avgMonthlyExpense,
    avgMonthlyIncome,
    avgSavingsRate,
  }
}

// ── CSV / JSON export ─────────────────────────────────────────────────

export function exportToCSV(transactions) {
  const headers = ['ID', 'Description', 'Category', 'Type', 'Amount', 'Status', 'Date']
  const rows = transactions.map(t => [
    t.id, t.description, t.category, t.type,
    t.type === 'income' ? t.amount : -t.amount,
    t.status, t.date,
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  downloadFile(csv, 'moneed-transactions.csv', 'text/csv')
}

export function exportToJSON(transactions) {
  const json = JSON.stringify(transactions, null, 2)
  downloadFile(json, 'moneed-transactions.json', 'application/json')
}

function downloadFile(content, filename, type) {
  const blob = new URL(`data:${type};charset=utf-8,` + encodeURIComponent(content))
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}