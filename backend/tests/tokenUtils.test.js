const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/tokenUtils');

describe('Token Utilities', () => {
  const originalSecret = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret_for_jwt_verification';
    process.env.JWT_EXPIRE = '1h';
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  it('generates a valid signed JWT token containing user id', () => {
    const userId = '654321654321654321654321';
    const token = generateToken(userId);

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(userId);
  });
});
