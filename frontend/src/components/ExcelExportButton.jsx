import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { downloadExcelSpreadsheet } from '../utils/excelExport';
import toast from 'react-hot-toast';

const ExcelExportButton = ({ transactions = [], filename = 'transactions.xls' }) => {
  const handleExport = () => {
    try {
      if (!transactions || transactions.length === 0) {
        return toast.error('No transactions available to export');
      }
      downloadExcelSpreadsheet(transactions, filename);
      toast.success('Excel spreadsheet downloaded!');
    } catch {
      toast.error('Failed to export Excel file');
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="btn-secondary text-sm flex items-center gap-1.5 py-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-400"
      title="Export to Microsoft Excel"
    >
      <FileSpreadsheet size={15} className="text-emerald-500" />
      <span>Export Excel</span>
    </button>
  );
};

export default ExcelExportButton;
