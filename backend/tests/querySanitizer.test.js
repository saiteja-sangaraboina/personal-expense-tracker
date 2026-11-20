const { sanitizeMongoQuery, querySanitizerMiddleware } = require('../utils/querySanitizer');

describe('querySanitizer utility', () => {
  it('strips top-level and nested dollar sign mongo operators', () => {
    const malicious = {
      username: 'admin',
      password: { $ne: 'random' },
      profile: {
        bio: 'Hello',
        $where: 'sleep(1000)',
      },
    };

    const sanitized = sanitizeMongoQuery(malicious);

    expect(sanitized.username).toBe('admin');
    expect(sanitized.password.$ne).toBeUndefined();
    expect(sanitized.profile.$where).toBeUndefined();
    expect(sanitized.profile.bio).toBe('Hello');
  });

  it('runs cleanly as express middleware', () => {
    const req = {
      body: { title: 'Test', $gt: '' },
      query: { filter: 'Food', $regex: '.*' },
      params: { id: '123' },
    };
    const next = jest.fn();

    querySanitizerMiddleware(req, {}, next);

    expect(req.body.$gt).toBeUndefined();
    expect(req.query.$regex).toBeUndefined();
    expect(req.body.title).toBe('Test');
    expect(next).toHaveBeenCalled();
  });
});
