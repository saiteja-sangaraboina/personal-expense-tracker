import { useEffect, useState } from 'react';
import { dashboardService, transactionService } from '../services/services';
import { useAuth } from '../context/AuthContext';
import ExpenseHeatmap from '../components/ExpenseHeatmap';
import SpendingForecastCard from '../components/SpendingForecastCard';
import { exportFinancialReportPdf } from '../utils/pdfExport';
import { Download, FileText } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899'];

const Reports = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dashboardService.getAnalytics({ year }),
      dashboardService.getSummary(),
      transactionService.getAll({ limit: 100 }),
    ])
      .then(([aRes, sRes, tRes]) => {
        setAnalytics(aRes.data.data);
        setSummary(sRes.data.data);
        setTransactions(tRes.data.data || []);
      })
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, [year]);

  const handleExportPdf = () => {
    exportFinancialReportPdf({ summary, analytics, user, year });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="label mb-0">Year:</label>
          <select className="input-field w-32" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[2023, 2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button
          onClick={handleExportPdf}
          className="btn-secondary text-sm flex items-center gap-2 py-2"
        >
          <FileText size={16} /> Export PDF Statement
        </button>
      </div>

      {/* Heatmap & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseHeatmap transactions={transactions} />
        </div>
        <div>
          <SpendingForecastCard monthlyData={analytics?.monthlyChart} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Monthly Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics?.monthlyChart || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[4,4,0,0]} />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={analytics?.monthlyChart || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses" />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={false} name="Income" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Category Breakdown (This Month)</h2>
          {analytics?.categoryChart?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={analytics.categoryChart} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3}>
                  {analytics.categoryChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data for this month</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
