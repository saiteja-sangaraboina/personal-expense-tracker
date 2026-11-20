import React from 'react';
import { Sun, Moon, Sunrise, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WelcomeBanner = ({ totalBalance = 0, monthlySavings = 0 }) => {
  const { user } = useAuth();
  const currentHour = new Date().getHours();

  let greeting = 'Good evening';
  let Icon = Moon;

  if (currentHour < 12) {
    greeting = 'Good morning';
    Icon = Sunrise;
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
    Icon = Sun;
  }

  const name = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 shadow-md">
      {/* Decorative background shapes */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute right-20 -bottom-10 w-32 h-32 bg-purple-500/20 rounded-full blur-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-indigo-200 text-sm font-medium">
            <Icon size={16} />
            <span>{greeting}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {name}!
          </h1>
          <p className="text-sm text-indigo-100/90 mt-1 max-w-xl">
            Here is your financial pulse for today. Keep tracking your daily expenses to stay within your targets.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
            <span className="text-xs text-indigo-200 block uppercase tracking-wider font-semibold">
              Net Balance
            </span>
            <span className="text-lg font-bold">
              ${Number(totalBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
            <span className="text-xs text-indigo-200 block uppercase tracking-wider font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> Savings
            </span>
            <span className="text-lg font-bold text-emerald-300">
              ${Number(monthlySavings || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
