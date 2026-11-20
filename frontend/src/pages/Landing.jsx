import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, PieChart, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Smart Analytics', desc: 'Visual charts to track spending patterns and income trends.' },
  { icon: PieChart, title: 'Budget Control', desc: 'Set category-wise budgets with real-time alerts.' },
  { icon: Shield, title: 'Secure & Private', desc: 'JWT auth, bcrypt hashing — your data stays yours.' },
  { icon: Wallet, title: 'All-in-One', desc: 'Income, expenses, budgets and reports in one place.' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-lg">ExpenseTracker</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-secondary text-sm">Log in</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <CheckCircle size={14} /> Free · No credit card required
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          Take control of your<br />
          <span className="text-indigo-600">personal finances</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Track income and expenses, set budgets, and understand your spending habits with beautiful charts and analytics.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
            Start for free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn-secondary text-base px-8 py-3">Log in</Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card text-center">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon size={22} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Landing;
