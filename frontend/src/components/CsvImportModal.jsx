import { useState } from 'react';
import { Upload, X, Check, AlertCircle, FileText } from 'lucide-react';
import { parseTransactionCsv } from '../utils/csvParser';
import { transactionService } from '../services/services';
import toast from 'react-hot-toast';

const CsvImportModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const processFile = (f) => {
    if (!f.name.endsWith('.csv')) {
      return toast.error('Please upload a valid .csv file');
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      const transactions = parseTransactionCsv(text);
      if (transactions.length === 0) {
        toast.error('Could not detect any valid transactions in the CSV');
      } else {
        setParsedData(transactions);
        toast.success(`Found ${transactions.length} transactions`);
      }
    };
    reader.readAsText(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  };

  const handleImport = async () => {
    if (parsedData.length === 0) return;
    setLoading(true);
    let successCount = 0;

    try {
      for (const t of parsedData) {
        await transactionService.create(t);
        successCount++;
      }
      toast.success(`Successfully imported ${successCount} transactions!`);
      onSuccess();
      handleClose();
    } catch {
      toast.error(`Imported ${successCount} of ${parsedData.length} before encountering an error.`);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setParsedData([]);
    setIsDragging(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Upload size={20} className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Import Transactions via CSV
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <FileText size={36} className="mx-auto text-indigo-500 mb-3 opacity-80" />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Drag and drop your bank CSV here
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Supported headers: Date, Amount, Description, Category, Type
              </p>
              <label className="btn-primary text-xs px-4 py-2 cursor-pointer inline-flex items-center gap-1.5">
                <Upload size={14} /> Browse Files
                <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl mb-4">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate max-w-xs">{file.name}</p>
                    <p className="text-[10px] text-gray-400">{parsedData.length} records detected</p>
                  </div>
                </div>
                <button onClick={() => { setFile(null); setParsedData([]); }} className="text-xs text-red-500 hover:underline">
                  Change file
                </button>
              </div>

              {parsedData.length > 0 && (
                <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/60 sticky top-0 text-gray-500 uppercase font-semibold">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Description</th>
                        <th className="p-2.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      {parsedData.slice(0, 15).map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                          <td className="p-2.5 text-gray-600 dark:text-gray-300">{row.date}</td>
                          <td className="p-2.5 capitalize">
                            <span className={row.type === 'income' ? 'text-emerald-500 font-semibold' : 'text-red-500 font-semibold'}>
                              {row.type}
                            </span>
                          </td>
                          <td className="p-2.5 text-gray-600 dark:text-gray-300">{row.category}</td>
                          <td className="p-2.5 text-gray-800 dark:text-gray-200 truncate max-w-xs">{row.description}</td>
                          <td className="p-2.5 text-right font-medium text-gray-900 dark:text-white">
                            ${row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            disabled={loading || parsedData.length === 0}
            onClick={handleImport}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
          >
            {loading ? 'Importing...' : `Import ${parsedData.length} Transactions`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CsvImportModal;
