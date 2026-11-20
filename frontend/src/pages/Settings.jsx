import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/services';
import ConfirmModal from '../components/ConfirmModal';
import SecurityPinModal from '../components/SecurityPinModal';
import { Sun, Moon, LogOut, Download, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings = () => {
  const { theme, toggleTheme, logout } = useTheme();
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleLogout = () => {
    authLogout();
    navigate('/login');
  };

  const handleExportAllData = async () => {
    setDownloading(true);
    try {
      const { data } = await authService.exportData();
      const blob = new Blob([JSON.stringify(data.archive, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      toast.success('Your complete data archive has been downloaded!');
    } catch {
      toast.error('Failed to export account archive');
    } finally {
      setDownloading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      toast.success('Account deleted successfully');
      authLogout();
      navigate('/register');
    } catch {
      toast.error('Failed to delete account');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Appearance</h3>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="text-xs text-gray-500">Switch between light and dark mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Portability & Backup</h3>
        <p className="text-xs text-gray-500 mb-5">
          Download a complete, offline JSON copy of all your income, expenses, budgets, and savings goals.
        </p>
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500" /> Full Data Backup
            </p>
            <p className="text-xs text-gray-500">JSON Archive (GDPR / CCPA Compliant)</p>
          </div>
          <button
            onClick={handleExportAllData}
            disabled={downloading}
            className="btn-secondary text-sm flex items-center gap-2 py-2"
          >
            <Download size={15} /> {downloading ? 'Preparing...' : 'Export Archive'}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access Security & PIN</h3>
        <p className="text-xs text-gray-500 mb-5">
          Enable a 4-digit security PIN for session locks and transaction approvals.
        </p>
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
              <Lock size={16} className="text-indigo-500" /> Security PIN Verification
            </p>
            <p className="text-xs text-gray-500">SHA-256 local encrypted PIN</p>
          </div>
          <button
            onClick={() => setIsPinModalOpen(true)}
            className="btn-secondary text-sm flex items-center gap-2 py-2"
          >
            <Lock size={15} /> Verify PIN
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Account Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Sign Out</p>
              <p className="text-xs text-gray-500">Sign out of this browser session</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary text-sm flex items-center gap-2 py-2">
              <LogOut size={15} /> Log out
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-red-600 flex items-center gap-1.5">
                <AlertTriangle size={15} /> Delete Account
              </p>
              <p className="text-xs text-gray-500">Permanently delete your profile and all financial records</p>
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="btn-danger text-sm flex items-center gap-2 py-2"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Permanently Delete Account?"
        message="This will immediately and irreversibly delete your profile, transactions, budgets, goals, and history. Are you absolutely sure?"
        confirmText="Yes, Delete Everything"
        isDestructive={true}
      />

      <SecurityPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
