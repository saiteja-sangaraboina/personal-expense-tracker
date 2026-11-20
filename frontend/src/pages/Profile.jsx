import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/services';
import { User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', currency: user?.currency || 'USD' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authService.updateProfile(profile);
      updateUser(data.user);
      toast.success('Profile updated!');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) return toast.error('New password must be at least 6 characters');
    setLoading(true);
    try {
      await authService.updatePassword(passwords);
      toast.success('Password updated!');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update password'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Avatar */}
      <div className="card flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-1">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <User size={18} className="text-indigo-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Personal Information</h3>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input-field" value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input-field" value={user?.email} disabled />
          </div>
          <div>
            <label className="label">Currency</label>
            <select className="input-field" value={profile.currency}
              onChange={(e) => setProfile({ ...profile, currency: e.target.value })}>
              {['USD','EUR','GBP','INR','JPY','CAD','AUD'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Password Form */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={18} className="text-indigo-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Change Password</h3>
        </div>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input-field" value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input-field" placeholder="At least 6 characters" value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
