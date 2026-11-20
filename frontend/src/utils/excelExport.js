/**
 * excelExport.js
 * Browser-compatible multi-sheet XML Spreadsheet (Excel compatible) generator.
 */

/**
 * Escape XML special characters.
 * @param {string} str
 * @returns {string}
 */
function escapeXml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate Excel XML Workbook content for transactions.
 * @param {Array<{ date: string, type: string, category: string, amount: number, description?: string }>} transactions
 * @param {string} title
 * @returns {string} XML spreadsheet string
 */
export function generateExcelWorkbook(transactions = [], title = 'Transactions') {
  const rowsXml = transactions.map((t) => {
    const isIncome = t.type === 'income';
    return `
      <Row>
        <Cell><Data ss:Type="String">${escapeXml(t.date ? new Date(t.date).toLocaleDateString() : '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(t.type || 'expense')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(t.category || 'Other')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(t.description || '')}</Data></Cell>
        <Cell><Data ss:Type="Number">${Number(t.amount || 0).toFixed(2)}</Data></Cell>
      </Row>
    `;
  }).join('');

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Worksheet ss:Name="${escapeXml(title)}">
  <Table>
   <Row ss:StyleID="Header">
    <Cell><Data ss:Type="String">Date</Data></Cell>
    <Cell><Data ss:Type="String">Type</Data></Cell>
    <Cell><Data ss:Type="String">Category</Data></Cell>
    <Cell><Data ss:Type="String">Description</Data></Cell>
    <Cell><Data ss:Type="String">Amount ($)</Data></Cell>
   </Row>
   ${rowsXml}
  </Table>
 </Worksheet>
</Workbook>`;
}

/**
 * Trigger browser file download of Excel spreadsheet.
 * @param {Array} transactions
 * @param {string} filename
 */
export function downloadExcelSpreadsheet(transactions = [], filename = 'expense-report.xls') {
  const xml = generateExcelWorkbook(transactions, 'Transactions');
  const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
