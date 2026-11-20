const { evaluatePasswordStrength } = require('../utils/passwordStrength');

describe('passwordStrength utility', () => {
  it('correctly evaluates very weak passwords', () => {
    const res = evaluatePasswordStrength('12345');
    expect(res.score).toBeLessThanOrEqual(1);
    expect(res.isStrong).toBe(false);
    expect(res.feedback.length).toBeGreaterThan(0);
  });

  it('correctly evaluates robust, complex passwords', () => {
    const res = evaluatePasswordStrength('P@ssw0rdSecure!2026');
    expect(res.score).toBeGreaterThanOrEqual(3);
    expect(res.isStrong).toBe(true);
    expect(res.feedback.length).toBe(0);
  });

  it('handles empty or non-string inputs safely', () => {
    const res = evaluatePasswordStrength(null);
    expect(res.score).toBe(0);
    expect(res.isStrong).toBe(false);
  });
});
