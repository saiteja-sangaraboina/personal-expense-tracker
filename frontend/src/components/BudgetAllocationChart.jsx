import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { formatBudgetAllocationData } from '../utils/budgetChartData';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

const BudgetAllocationChart = ({ budgets = [] }) => {
  const { chartData, totalBudget, topCategory } = formatBudgetAllocationData(budgets);

  if (!chartData.length) return null;

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <PieIcon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Category Budget Distribution
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Budgeted: ${totalBudget.toLocaleString()} · Top: {topCategory?.name} ({topCategory?.percentage}%)
            </p>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val, name, entry) => [
                `$${val.toLocaleString()} (${entry.payload.percentage}%)`,
                name,
              ]}
            />
            <Legend iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetAllocationChart;
