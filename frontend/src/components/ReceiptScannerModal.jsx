import { useState } from 'react';
import { Camera, Upload, X, Check, FileText, Sparkles } from 'lucide-react';
import { parseReceiptData } from '../utils/receiptParser';
import { transactionService } from '../services/services';
import toast from 'react-hot-toast';

const ReceiptScannerModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extracted, setExtracted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setLoading(true);

      // Simulate OCR scanning delay
      setTimeout(() => {
        const data = parseReceiptData(selected.name);
        setExtracted(data);
        setLoading(false);
        toast.success('Receipt details scanned successfully!');
      }, 700);
    }
  };

  const handleSaveTransaction = async () => {
    if (!extracted) return;
    setSaving(true);
    try {
      await transactionService.create({
        type: 'expense',
        amount: extracted.amount,
        category: extracted.category,
        description: `${extracted.vendor} (Scanned Receipt)`,
        date: extracted.date,
      });
      toast.success('Scanned expense saved to transactions!');
      onSuccess();
      handleClose();
    } catch {
      toast.error('Failed to save scanned transaction');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setExtracted(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              AI Receipt Scanner
            </h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!file ? (
            <label className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
              <Camera size={36} className="text-indigo-500 mb-2 opacity-80" />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Upload or take a photo of your receipt
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, or PDF (Auto OCR extract)</p>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="space-y-4">
              {loading ? (
                <div className="p-8 text-center space-y-3">
                  <Sparkles size={28} className="mx-auto text-amber-500 animate-spin" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scanning receipt with AI OCR...
                  </p>
                </div>
              ) : (
                extracted && (
                  <div className="space-y-3">
                    <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                            Extracted Vendor
                          </span>
                          <h4 className="text-base font-bold text-gray-900 dark:text-white">
                            {extracted.vendor}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                            Total Detected
                          </span>
                          <p className="text-lg font-extrabold text-red-500">
                            ${extracted.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-indigo-100/80 dark:border-indigo-900/60 text-gray-600 dark:text-gray-300">
                        <div>Category: <span className="font-semibold">{extracted.category}</span></div>
                        <div>Date: <span className="font-semibold">{extracted.date}</span></div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800">
          <button type="button" onClick={handleClose} className="btn-secondary text-xs px-4 py-2">
            Cancel
          </button>
          <button
            type="button"
            disabled={!extracted || saving || loading}
            onClick={handleSaveTransaction}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
          >
            {saving ? 'Saving...' : 'Save as Expense'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptScannerModal;
