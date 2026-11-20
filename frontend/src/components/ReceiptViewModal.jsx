import React from 'react';
import { Printer, Download, X, Receipt } from 'lucide-react';
import { generateReceiptVoucherHtml } from '../utils/receiptGenerator';

const ReceiptViewModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const voucherHtml = generateReceiptVoucherHtml(transaction);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Receipt Voucher</title></head><body style="display:flex;justify-content:center;padding:20px;">${voucherHtml}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Receipt size={20} />
            <span>Receipt Voucher</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 overflow-x-auto flex justify-center mb-4 border border-gray-200 dark:border-gray-700"
          dangerouslySetInnerHTML={{ __html: voucherHtml }}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handlePrint}
            className="btn-primary text-sm flex items-center gap-1.5 py-2 px-4"
          >
            <Printer size={15} /> Print Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewModal;
