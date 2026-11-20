import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/budgets': 'Budget Manager',
  '/goals': 'Savings Goals',
  '/recurring': 'Subscriptions & Recurring',
  '/categories': 'Custom Categories',
  '/reports': 'Reports & Analytics',
  '/profile': 'My Profile',
  '/settings': 'Settings',
};

const MainLayout = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
