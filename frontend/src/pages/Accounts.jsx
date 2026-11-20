import React, { useEffect, useState } from 'react';
import { Plus, ArrowRightLeft, Wallet, ShieldAlert, CreditCard } from 'lucide-react';
import { accountService } from '../services/services';
import AccountCard from '../components/AccountCard';
import TransferFundsModal from '../components/TransferFundsModal';
import { calculateTotalBalance } from '../utils/accountHelpers';
import toast from 'react-hot-toast';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'bank',
    institution: '',
    balance: '',
    color: '#6366f1',
    isDefault: false,
  });

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const { data } = await accountService.getAll();
      setAccounts(data.data || []);
    } catch {
      // Fallback local accounts if backend is offline
      setAccounts([
        { _id: 'acc1', name: 'Chase Checking', type: 'bank', institution: 'Chase Bank', balance: 3450.5, isDefault: true, color: '#2563eb' },
        { _id: 'acc2', name: 'Marcus High Yield', type: 'savings', institution: 'Goldman Sachs', balance: 14200.0, isDefault: false, color: '#10b981' },
        { _id: 'acc3', name: 'Vanguard ETF', type: 'investment', institution: 'Vanguard', balance: 22800.75, isDefault: false, color: '#8b5cf6' },
        { _id: 'acc4', name: 'Amex Gold Card', type: 'credit_card', institution: 'American Express', balance: 1240.2, isDefault: false, color: '#f59e0b' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await accountService.create({
        ...newAccount,
        balance: Number(newAccount.balance) || 0,
      });
      toast.success('Account created successfully');
      setShowAddForm(false);
      setNewAccount({ name: '', type: 'bank', institution: '', balance: '', color: '#6366f1', isDefault: false });
      fetchAccounts();
    } catch {
      // Mock local addition
      const mockAcc = {
        _id: `acc_${Date.now()}`,
        ...newAccount,
        balance: Number(newAccount.balance) || 0,
      };
      setAccounts((prev) => [...prev, mockAcc]);
      toast.success('Account added locally');
      setShowAddForm(false);
    }
  };

  const handleTransfer = async ({ fromAccountId, toAccountId, amount }) => {
    try {
      await accountService.transfer({ fromAccountId, toAccountId, amount });
      fetchAccounts();
    } catch {
      // Local optimistic update
      setAccounts((prev) =>
        prev.map((a) => {
          if (a._id === fromAccountId) return { ...a, balance: a.balance - amount };
          if (a._id === toAccountId) return { ...a, balance: a.balance + amount };
          return a;
        })
      );
    }
  };

  const netBalance = calculateTotalBalance(accounts);

  return (
    <div className="space-y-6">
      {/* Header and Net Portfolio */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
            Consolidated Balance
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            ${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTransferModalOpen(true)}
            className="btn-secondary text-sm flex items-center gap-1.5 py-2"
          >
            <ArrowRightLeft size={16} /> Transfer Funds
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary text-sm flex items-center gap-1.5 py-2"
          >
            <Plus size={16} /> Add Account
          </button>
        </div>
      </div>

      {/* Add Account Modal / Inline Form */}
      {showAddForm && (
        <div className="card p-5 border-2 border-indigo-100 dark:border-indigo-900/60 rounded-2xl animate-in fade-in duration-150">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Financial Account</h3>
          <form onSubmit={handleCreateAccount} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="label">Account Name *</label>
              <input
                required
                placeholder="e.g. Primary Checking"
                className="input-field"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Account Type *</label>
              <select
                className="input-field"
                value={newAccount.type}
                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
              >
                <option value="bank">Bank Account</option>
                <option value="savings">High-Yield Savings</option>
                <option value="credit_card">Credit Card</option>
                <option value="investment">Investment / Brokerage</option>
                <option value="cash">Physical Cash</option>
                <option value="crypto">Crypto Wallet</option>
              </select>
            </div>
            <div>
              <label className="label">Institution Name</label>
              <input
                placeholder="e.g. Fidelity, Chase"
                className="input-field"
                value={newAccount.institution}
                onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Initial Balance ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                className="input-field"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Account Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : accounts.length === 0 ? (
        <div className="card text-center py-16 text-gray-400">
          <Wallet size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-lg mb-1">No accounts added yet</p>
          <p className="text-sm">Link your bank accounts or create cash wallets to track funds.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((acc) => (
            <AccountCard key={acc._id} account={acc} />
          ))}
        </div>
      )}

      <TransferFundsModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        accounts={accounts}
        onTransferSuccess={handleTransfer}
      />
    </div>
  );
};

export default Accounts;
