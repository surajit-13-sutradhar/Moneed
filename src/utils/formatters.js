export const formatCurrency = (amount, compact = false) => {
  if (compact && Math.abs(amount) >= 1000) {
    const formatted = new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
    return `₹${formatted}`
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

export const formatDateShort = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric',
  })

export const formatPercent = (value, showSign = true) => {
  const sign = showSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export const getMonthLabel = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })