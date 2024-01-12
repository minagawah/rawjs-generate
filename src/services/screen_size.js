/**
 * A module to let you manage
 * browser's 'resize' events.
 * Using Broadcast Channel API,
 * it will automatically
 * start listening to 'resize'
 * events. Once started, you
 * can subscribe to the channel.
 *
 * @module rawgen/app/services/screen_size
 */

import { get_screen_size, debounce } from '../lib/utils';
import { RESIZE_DEBOUNCE_MSEC } from '../constants';

// We need 2 instances for
// sending and receiving.
const ch = {
  sender: new BroadcastChannel('resize'),
  receiver: new BroadcastChannel('resize'),
};

/**
 * @typedef ScreenSize
 * @type {import('../lib/utils.js').ScreenSize}
 */

// Bellow, we are making an union
// type 'ScreenSizePayload'
// by extending 'ScreenSize'.
// Yet, we currently have no way
// to extend object type definitions
// so that for both JSDoc and
// TypeScript to work. Thanks to
// 'jsdoc-plugin-intersection'
// which allows us to use '&'
// which is of TypeScript, and
// the plugin will convert '&'
// into '|' which is of JSDoc.

/**
 * @typedef ScreenSizePayload
 * @type {ScreenSize & { is_mobile: boolean }}
 */

/**
 * @typedef Options
 * @type {Object}
 * @property {number} [delay]
 * @property {number} [delay_init]
 * @property {MessageHandler} [handler]
 */

/**
 * It will automatically start listening
 * to browser's 'resize' events.
 * When the event is received, it will
 * publish a message with its payload
 * being device's screen size.
 * If a handler is given, it will also
 * let you subscribe to the message
 * channel just established.
 * @public
 * @function
 * @param {Options} [options={}]
 */
export function start_screen_size(options = {}) {
  const {
    delay = RESIZE_DEBOUNCE_MSEC,
    delay_init = 200,
    handler,
  } = options;

  window.addEventListener(
    'resize',
    debounce(on_resize, delay),
    true
  );

  window.setTimeout(on_resize, delay_init);

  if (typeof handler === 'function') {
    use_screen_size(handler);
  }

  /**
   * @private
   * @function
   */
  function on_resize() {
    const size = get_screen_size();
    const is_mobile = size?.width < 768;

    /**
     * @type {import('../types.js').BroadcastMessageData<ScreenSizePayload>}
     */
    const data = {
      action: 'change-screen-size',
      payload: { ...size, is_mobile },
    };

    ch.sender.postMessage(data);
  }
}

/**
 * @typedef MessageHandler
 * @type {import('../types.js').BroadcastMessageHandler<ScreenSizePayload>}
 */

/**
 * Let you subscribe to the message
 * channel. The callback handler will
 * receive a payload which is the
 * device's screen size information.
 * @public
 * @function
 * @throws {Error}
 * @param {MessageHandler} handler
 */
export function use_screen_size(handler) {
  if (!handler) throw new Error('No handler');
  ch.receiver.addEventListener('message', handler);
}
