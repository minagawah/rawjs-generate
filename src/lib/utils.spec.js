const {
  noop,
  gen_hash,
  get_screen_size,
} = require('./utils.js');

describe('A test suite for: lib/utils', () => {
  let orig;

  beforeAll(() => {
    orig = { ...window };
  });

  afterAll(() => {
    // eslint-disable-next-line no-global-assign
    window = orig;
  });

  test('noop', () => {
    expect(noop()).toBe(undefined);
  });

  test('gen_hash', () => {
    expect(gen_hash()).toHaveLength(64);
  });

  test('get_screen_size', () => {
    const w = 800;
    const h = 600;

    window.innerWidth = w;
    window.innerHeight = h;

    const { width, height } = get_screen_size();
    expect(width).toBe(w);
    expect(height).toBe(h);
  });
});
