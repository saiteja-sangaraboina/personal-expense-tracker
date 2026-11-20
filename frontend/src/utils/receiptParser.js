/**
 * Simulates intelligent receipt OCR extraction from image files
 * Extracts vendor name, date, total amount, category, and line items
 */
export const parseReceiptData = (fileName = '', mockAmount = null) => {
  const cleanName = fileName.toLowerCase();

  let detectedVendor = 'Retail Merchant';
  let detectedCategory = 'Shopping';
  let estimatedAmount = mockAmount || (Math.floor(Math.random() * 8500) + 1500) / 100;

  if (cleanName.includes('walmart') || cleanName.includes('grocery') || cleanName.includes('trader') || cleanName.includes('target')) {
    detectedVendor = 'Grocery Mart';
    detectedCategory = 'Food';
  } else if (cleanName.includes('uber') || cleanName.includes('lyft') || cleanName.includes('gas') || cleanName.includes('shell')) {
    detectedVendor = 'Transportation / Gas';
    detectedCategory = 'Transportation';
  } else if (cleanName.includes('restaurant') || cleanName.includes('cafe') || cleanName.includes('starbucks')) {
    detectedVendor = 'Coffee & Dining';
    detectedCategory = 'Food';
  } else if (cleanName.includes('pharmacy') || cleanName.includes('cvs') || cleanName.includes('walgreens')) {
    detectedVendor = 'Pharmacy Care';
    detectedCategory = 'Healthcare';
  } else if (cleanName.includes('apple') || cleanName.includes('bestbuy') || cleanName.includes('amazon')) {
    detectedVendor = 'Electronics Store';
    detectedCategory = 'Shopping';
  }

  const todayStr = new Date().toISOString().split('T')[0];

  return {
    vendor: detectedVendor,
    category: detectedCategory,
    amount: estimatedAmount,
    date: todayStr,
    tax: Math.round(estimatedAmount * 0.08 * 100) / 100,
    confidence: 0.94,
    detectedItems: [
      { item: `${detectedVendor} Purchase`, price: estimatedAmount },
    ],
  };
};
