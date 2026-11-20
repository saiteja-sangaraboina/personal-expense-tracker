import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import KeyboardShortcutsModal from '../components/KeyboardShortcutsModal';
import TransactionModal from '../components/TransactionModal';
import QuickActionBar from '../components/QuickActionBar';
import MobileNav from '../components/MobileNav';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useTheme } from '../context/ThemeContext';
import { Outlet, useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/accounts': 'Accounts & Wallets',
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
  const { toggleTheme } = useTheme();

  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  useKeyboardShortcuts({
    onNewTransaction: () => setIsQuickAddOpen(true),
    onToggleTheme: toggleTheme,
    onHelpModal: () => setIsShortcutOpen(true),
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <KeyboardShortcutsModal
        isOpen={isShortcutOpen}
        onClose={() => setIsShortcutOpen(false)}
      />
      <TransactionModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSuccess={() => window.location.reload()}
      />
      <QuickActionBar onOpenTransactionModal={() => setIsQuickAddOpen(true)} />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
