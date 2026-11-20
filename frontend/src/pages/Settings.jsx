import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Appearance</h3>
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="text-xs text-gray-500">Switch between light and dark mode</p>
          </div>
          <button onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Account</h3>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-red-600">Log out</p>
            <p className="text-xs text-gray-500">Sign out of your account</p>
          </div>
          <button onClick={handleLogout} className="btn-danger text-sm flex items-center gap-2 py-2">
            <LogOut size={15} /> Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
