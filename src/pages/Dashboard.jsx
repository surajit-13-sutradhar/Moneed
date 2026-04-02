import { useMemo } from 'react'
import { Wallet, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getSummaryStats, getMonthlyTrend, getCategoryBreakdown } from '../utils/aggregations'
import { formatCurrency } from '../utils/formatters'
import SectionHeader    from '../components/ui/SectionHeader'
import StatCard         from '../components/ui/StatCard'
import BalanceTrendChart   from '../components/charts/BalanceTrendChart'
import SpendingDonutChart  from '../components/charts/SpendingDonutChart'
import RecentTransactions  from '../components/dashboard/RecentTransactions'
import SavingsCard         from '../components/dashboard/SavingsCard'

export default function Dashboard() {
  const { state } = useApp()
  const { transactions } = state

  const stats     = useMemo(() => getSummaryStats(transactions),    [transactions])
  const trend     = useMemo(() => getMonthlyTrend(transactions),    [transactions])
  const breakdown = useMemo(() => getCategoryBreakdown(transactions),[transactions])

  return (
    <div>
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Track your money, performance, and trends- all in one place."
      />

      {/* ── Top row: stat cards ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Balance"
          value={formatCurrency(stats.totalBalance)}
          icon={Wallet}
          iconBg="bg-brand/10"
          iconColor="text-brand"
          accent
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(stats.thisMonthIncome)}
          change={stats.incomeChange}
          icon={TrendingUp}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(stats.thisMonthExpenses)}
          change={stats.expensesChange}
          icon={TrendingDown}
          iconBg="bg-danger/10"
          iconColor="text-danger"
        />
      </div>

      {/* ── Main grid: 65 / 35 split ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

        {/* LEFT column */}
        <div className="space-y-6">

          {/* Balance trend chart */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-primary">Cash Flow</h2>
                <p className="text-xs text-secondary mt-0.5">Income vs Expenses over time</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-secondary">
                <BarChart2 size={12} strokeWidth={2} />
                Monthly
              </div>
            </div>
            <BalanceTrendChart data={trend} />
          </div>

          {/* Recent transactions */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-primary">Recent Transactions</h2>
                <p className="text-xs text-secondary mt-0.5">Your latest financial activity</p>
              </div>
            </div>
            <RecentTransactions transactions={transactions} />
          </div>

        </div>

        {/* RIGHT column */}
        <div className="space-y-6">

          {/* Spending donut */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft dark:shadow-none">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-primary">Spending Breakdown</h2>
              <p className="text-xs text-secondary mt-0.5">By category, all time</p>
            </div>
            <SpendingDonutChart data={breakdown} />
          </div>

          {/* Savings card */}
          <SavingsCard
            savingsRate={stats.savingsRate}
            thisMonthIncome={stats.thisMonthIncome}
            thisMonthExpenses={stats.thisMonthExpenses}
          />

        </div>
      </div>
    </div>
  )
}