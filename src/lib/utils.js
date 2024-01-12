/**
 * @module rawgen/lib/utils
 */

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/** @type {function(): void} */
export const noop = () => {};

/** @type {function(number): number} */
export const int = Math.trunc;

/**
 * @function
 * @param {number} [size=64]
 * @returns {string}
 */
export function gen_hash(size = 64) {
  let hash = '';
  const char_size = CHARS.length;
  let i = 0;
  while (i < size) {
    hash += CHARS.charAt(
      Math.floor(Math.random() * char_size)
    );
    i++;
  }
  return hash;
}

/** @typedef {{ width: number, height: number }} ScreenSize */

/** @type {function(): ScreenSize} */
export const get_screen_size = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/** @type {function(number, number): number} */
export function get_random_between(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let time = Date.now();

/**
 * @function
 * @param {function} f
 * @param {number} delay
 * @returns {function(): void}
 */
export function debounce(f, delay) {
  /** @type {TimeoutReturnType} */
  let timeout = null;

  /** @type {*} */
  let args = null;

  /**
   * This is a wrapper function to 'f'.
   * @function
   */
  const g = () => {
    f.apply(null, args);
    time = Date.now();
  };

  return function () {
    args = arguments;

    if (!timeout && Date.now() >= time + delay) {
      g();
    } else {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(g, delay);
    }
  };
}
