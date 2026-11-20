import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Filter, Download, Upload, Camera } from 'lucide-react';
import { transactionService } from '../services/services';
import TransactionItem from '../components/TransactionItem';
import TransactionModal from '../components/TransactionModal';
import CsvImportModal from '../components/CsvImportModal';
import ReceiptScannerModal from '../components/ReceiptScannerModal';
import toast from 'react-hot-toast';

const CATEGORIES = ['All','Food','Shopping','Transportation','Education','Entertainment','Healthcare','Bills','Travel','Salary','Freelance','Other'];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ type: '', category: '', search: '', sortBy: 'date', order: 'desc', page: 1 });

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v && v !== 'All'));
      const { data } = await transactionService.getAll(params);
      setTransactions(data.data);
      setTotal(data.total);
    } catch { toast.error('Failed to load transactions'); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await transactionService.remove(id);
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch { toast.error('Failed to delete'); }
  };

  const handleEdit = (transaction) => { setEditing(transaction); setModalOpen(true); };
  const handleClose = () => { setEditing(null); setModalOpen(false); };

  const handleExport = async () => {
    try {
      const { data } = await transactionService.export();
      const blob = new Blob([data.csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'transactions.csv'; a.click();
      toast.success('Exported successfully!');
    } catch { toast.error('Export failed'); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{total} Transactions</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setImportOpen(true)} className="btn-secondary text-sm flex items-center gap-1.5 py-2">
            <Upload size={15} /> Import CSV
          </button>
          <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1.5 py-2">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={() => setScannerOpen(true)} className="btn-secondary text-sm flex items-center gap-1.5 py-2">
            <Camera size={15} /> Scan Receipt
          </button>
          <button onClick={() => setModalOpen(true)} className="btn-primary text-sm flex items-center gap-1.5 py-2">
            <Plus size={15} /> Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search transactions..." className="input-field pl-9"
              value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })} />
          </div>
          <select className="input-field w-auto" value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value, page: 1 })}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="input-field w-auto" value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value === 'All' ? '' : e.target.value, page: 1 })}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="input-field w-auto" value={`${filters.sortBy}-${filters.order}`}
            onChange={(e) => { const [s, o] = e.target.value.split('-'); setFilters({ ...filters, sortBy: s, order: o }); }}>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High)</option>
            <option value="amount-asc">Amount (Low)</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or add a new transaction.</p>
          </div>
        ) : (
          transactions.map((t) => (
            <TransactionItem key={t._id} transaction={t} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>

      <TransactionModal isOpen={modalOpen} onClose={handleClose} transaction={editing} onSuccess={() => { fetchTransactions(); handleClose(); }} />
      <CsvImportModal isOpen={importOpen} onClose={() => setImportOpen(false)} onSuccess={fetchTransactions} />
      <ReceiptScannerModal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} onSuccess={fetchTransactions} />
    </div>
  );
};

export default Transactions;
