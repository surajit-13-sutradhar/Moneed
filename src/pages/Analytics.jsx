import { useMemo } from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  getSummaryStats,
  getMonthlyTrend,
  getCategoryBreakdown,
  getInsights,
} from '../utils/aggregations'
import { formatCurrency } from '../utils/formatters'
import SectionHeader       from '../components/ui/SectionHeader'
import StatCard            from '../components/ui/StatCard'
import MonthlyBarChart     from '../components/charts/MonthlyBarChart'
import SpendingDonutChart  from '../components/charts/SpendingDonutChart'
import TopCategoryCard     from '../components/analytics/TopCategoryCard'
import MonthComparisonCard from '../components/analytics/MonthComparisonCard'
import AvgStatsCard        from '../components/analytics/AvgStatsCard'

export default function Analytics() {
  const { state } = useApp()
  const { transactions } = state

  const stats     = useMemo(() => getSummaryStats(transactions),    [transactions])
  const trend     = useMemo(() => getMonthlyTrend(transactions),    [transactions])
  const breakdown = useMemo(() => getCategoryBreakdown(transactions),[transactions])
  const insights  = useMemo(() => getInsights(transactions),        [transactions])

  const isEmpty = transactions.length === 0

  if (isEmpty) {
    return (
      <div>
        <SectionHeader
          title="Analytics"
          subtitle="Understand trends, spending patterns, and financial performance over time."
        />
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center">
            <TrendingUp size={28} strokeWidth={1.5} className="text-secondary opacity-50" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-primary">No data yet</p>
            <p className="text-sm text-secondary mt-1">Add some transactions to see your analytics.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader
        title="Analytics"
        subtitle="Understand trends, spending patterns, and financial performance over time."
      />

      {/* ── Top stat cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Avg Monthly Income"
          value={formatCurrency(insights.avgMonthlyIncome)}
          icon={TrendingUp}
          iconBg="bg-success/10"
          iconColor="text-success"
          changeLabel="based on all months"
        />
        <StatCard
          title="Avg Monthly Expenses"
          value={formatCurrency(insights.avgMonthlyExpense)}
          icon={TrendingDown}
          iconBg="bg-danger/10"
          iconColor="text-danger"
          changeLabel="based on all months"
        />
        <StatCard
          title="Avg Savings Rate"
          value={`${insights.avgSavingsRate.toFixed(1)}%`}
          icon={Wallet}
          iconBg="bg-brand/10"
          iconColor="text-brand"
          changeLabel="income minus expenses"
        />
      </div>

      {/* ── Main grid: 65 / 35 ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Monthly bar chart */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-primary">Monthly Breakdown</h2>
              <p className="text-xs text-secondary mt-0.5">Income vs Expenses per month</p>
            </div>
            <MonthlyBarChart data={trend} />
          </div>

          {/* Insights row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MonthComparisonCard monthOverMonth={insights.monthOverMonth} />
            <AvgStatsCard
              avgMonthlyIncome={insights.avgMonthlyIncome}
              avgMonthlyExpense={insights.avgMonthlyExpense}
              avgSavingsRate={insights.avgSavingsRate}
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* Spending donut */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-primary">Spending by Category</h2>
              <p className="text-xs text-secondary mt-0.5">All time breakdown</p>
            </div>
            <SpendingDonutChart data={breakdown} />
          </div>

          {/* Top category */}
          <TopCategoryCard
            topCategory={insights.topCategory}
            breakdown={breakdown}
          />

        </div>
      </div>
    </div>
  )
}