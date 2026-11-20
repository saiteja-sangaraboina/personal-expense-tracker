import { Sparkles, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { forecastNextMonth } from '../utils/forecasting';

const SpendingForecastCard = ({ monthlyData = [] }) => {
  const forecast = forecastNextMonth(monthlyData);

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Next Month Projection
          </h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          AI Weighted Forecast
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <span className="text-[11px] text-gray-400 block mb-0.5">Projected Outflow</span>
          <span className="text-lg font-extrabold text-red-500">
            ${forecast.forecastExpense.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
            {forecast.trend === 'increasing' ? (
              <span className="text-red-500 flex items-center gap-0.5"><TrendingUp size={12} /> Rising</span>
            ) : forecast.trend === 'decreasing' ? (
              <span className="text-emerald-500 flex items-center gap-0.5"><TrendingDown size={12} /> Cooling</span>
            ) : (
              <span>Stable trend</span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <span className="text-[11px] text-gray-400 block mb-0.5">Expected Surplus</span>
          <span className="text-lg font-extrabold text-emerald-500">
            ${forecast.projectedSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400 block mt-1">
            {forecast.confidence.toUpperCase()} confidence
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpendingForecastCard;
