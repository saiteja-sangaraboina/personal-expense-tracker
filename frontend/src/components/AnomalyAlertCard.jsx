import React from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';
import { detectTransactionAnomalies } from '../utils/anomalyDetector';

const AnomalyAlertCard = ({ transactions = [] }) => {
  const data = detectTransactionAnomalies(transactions);

  if (data.alertLevel === 'none') return null;

  return (
    <div className="card p-5 border border-amber-200 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/30 to-white dark:from-amber-950/20 dark:to-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 rounded-xl">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Spending Anomaly & Spike Detection
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Found {data.anomalies.length} unusual expense(s) totaling ${data.totalAnomalousSpend.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 font-semibold rounded-lg">
            {data.alertLevel.toUpperCase()} RISK
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {data.anomalies.slice(0, 3).map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-gray-750 border border-gray-100 dark:border-gray-700"
          >
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                {item.title}
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                {item.timesAboveAverage}x higher than your average {item.category} spend
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ${item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyAlertCard;
