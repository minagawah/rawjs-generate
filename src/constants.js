/**
 * @module rawgen/constants
 */

/** @typedef {'on' | 'off'} Status */

/** @type {Status} */
export const STATUS_ON = 'on';

/** @type {Status} */
export const STATUS_OFF = 'off';

// eslint-disable-next-line @stylistic/max-len
export const ELEMENT_DESTROY_DURATION_MSEC = 4000;

export const RESIZE_DEBOUNCE_MSEC = 500;

export const BOX_GENERATE_MSEC = 30;
export const BOX_SIZE = 65;
export const BOX_COLORS = [
  '#c2ff9c', // pale green
  '#6be520', // green
  '#ff635b', // pale red
  '#e93b32', // red
  '#fdff78', // pale yellow
  '#fbe125', // yellow
];

export const CONTENT_WRAPPER_ID = 'content-wrapper';
export const CONTENT_ID = 'content';
export const CONTENT_HEIGHT_PC = '60vh';

export const FOOTER_WRAPPER_ID = 'footer-wrapper';
export const FOOTER_ID = 'footer';
export const FOOTER_HEIGHT_MOBILE = '20vh';
export const FOOTER_HEIGHT_PC = '160px';
