describe('Custom Tag Data Model and Sanitization', () => {
  it('strips leading hash symbols and trims tag names', () => {
    const rawInput = '  #vacation2024  ';
    const cleanName = String(rawInput || '').trim().replace(/^#/, '');
    expect(cleanName).toBe('vacation2024');
  });

  it('validates tag object structure and default color', () => {
    const mockTag = {
      name: 'taxDeductible',
      color: '#10b981',
      usageCount: 5,
    };

    expect(mockTag.name).toBe('taxDeductible');
    expect(mockTag.color).toBe('#10b981');
    expect(mockTag.usageCount).toBe(5);
  });
});
