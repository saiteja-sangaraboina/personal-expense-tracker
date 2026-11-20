import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus } from 'lucide-react';
import { dashboardService } from '../services/services';
import StatCard from '../components/StatCard';
import TransactionItem from '../components/TransactionItem';
import TransactionModal from '../components/TransactionModal';
import CurrencyConverterWidget from '../components/CurrencyConverterWidget';
import FinancialHealthScoreCard from '../components/FinancialHealthScoreCard';
import SpendingInsightsCard from '../components/SpendingInsightsCard';
import WelcomeBanner from '../components/WelcomeBanner';
import EmergencyFundCard from '../components/EmergencyFundCard';
import SpendingVelocityCard from '../components/SpendingVelocityCard';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899'];

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [s, a] = await Promise.all([dashboardService.getSummary(), dashboardService.getAnalytics()]);
      setSummary(s.data.data);
      setAnalytics(a.data.data);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeBanner
        totalBalance={summary?.balance}
        monthlySavings={summary?.monthlySavings}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Balance" amount={summary?.balance} icon={Wallet} color="indigo" />
        <StatCard title="Total Income" amount={summary?.totalIncome} icon={TrendingUp} color="green" />
        <StatCard title="Total Expenses" amount={summary?.totalExpenses} icon={TrendingDown} color="red" />
        <StatCard title="Monthly Savings" amount={summary?.monthlySavings} icon={PiggyBank} color="purple" />
      </div>

      {/* Spending Velocity & Pace */}
      <SpendingVelocityCard
        currentMonthSpent={summary?.totalExpenses || 0}
        previousMonthSpent={summary?.previousMonthExpenses || 0}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Income vs Expenses</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics?.monthlyChart || []}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" strokeWidth={2} name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenses)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Spending by Category</h2>
          {analytics?.categoryChart?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={analytics.categoryChart} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  dataKey="value" nameKey="name" paddingAngle={3}>
                  {analytics.categoryChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No expense data yet</div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <button onClick={() => setModalOpen(true)} className="btn-primary text-sm flex items-center gap-1.5 py-2">
            <Plus size={16} /> Add New
          </button>
        </div>
        {summary?.recentTransactions?.length > 0 ? (
          <div>
            {summary.recentTransactions.map((t) => (
              <TransactionItem key={t._id} transaction={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Wallet size={40} className="mx-auto mb-3 opacity-50" />
            <p>No transactions yet. Add your first one!</p>
          </div>
        )}
      </div>

      <SpendingInsightsCard
        currentTransactions={summary?.recentTransactions || []}
        previousTransactions={[]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <FinancialHealthScoreCard summary={summary} />
        <EmergencyFundCard
          monthlyEssential={Math.round((summary?.totalExpenses || 2500) * 0.7)}
          currentSavings={summary?.monthlySavings || 5000}
        />
      </div>

      <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchData} />
    </div>
  );
};

export default Dashboard;
