/**
 * @module rawgen/components/content
 */

// When app starts, it will
// start generating boxes randomely,
// and adding them to a wrapper,
// called 'stage'. You can see
// 'setInterval' constantly runs
// 'generator' function.
// 'click_handler' subscribes to
// 'click' channel, and only when
// having a message with its
// 'action' being 'generate-box',
// it would change the internal
// 'status' to STATUS_ON or
// STATUS_OFF. When having
// STATUS_OFF, it will stop
// generating boxes. We have
// a button for 'STOP/START'
// in 'Footer' component.
// That's where 'click' message
// is broadcasted.

import { raw } from '@squaresapp/rawjs';

import {
  STATUS_ON,
  CONTENT_ID,
  BOX_GENERATE_MSEC,
  BOX_SIZE,
  BOX_COLORS,
} from '../constants';

import { int, get_random_between } from '../lib/utils';
import { Box } from './box';

const margin = BOX_SIZE + 5;
const ch = new BroadcastChannel('click');

/**
 * @typedef Status
 * @type {import('../constants.js').Status}
 */

/**
 * @typedef ClickMessageHandler
 * @type {import('../types.js').BroadcastMessageHandler<Status>}
 */

/**
 * @typedef Props
 * @type {import('../types.js').GenericProps}
 */

/**
 * @public
 * @function
 * @param {Props} [props]
 * @returns {HTMLElement}
 */
export const Content = props => {
  const styles = props?.styles || {};
  const stage = raw.div({ id: 'stage' });

  /** @type {Status} */
  let status = STATUS_ON;

  ch.addEventListener('message', click_handler);

  setInterval(generator, BOX_GENERATE_MSEC);

  /**
   * @type {ClickMessageHandler}
   */
  function click_handler({ data }) {
    // For the handler also
    // listens to other click
    // messages, it is OK
    // to receive different
    // actions here. We will
    // proceed only when we
    // have 'generate-box'.
    if (data?.action === 'generate-box') {
      if (!data?.payload) throw new Error('No payload');
      status = data.payload;
    }
  }

  /**
   * @private
   * @function
   */
  function generator() {
    const bound = stage.getBoundingClientRect();
    const props = get_props({
      status,
      width: bound.width,
      height: bound.height,
    });
    if (props) {
      stage.append(Box(props).el);
    }
  }

  return raw.div({ id: CONTENT_ID }, styles, stage);
};

/**
 * @private
 * @function
 * @param {Object} args
 * @param {Status} args.status
 * @param {number} args.width
 * @param {number} args.height
 * @returns {Props | undefined}
 */
function get_props(args) {
  const { status, width, height } = args || {};
  if (status !== STATUS_ON || !width || !height) return;

  const x_max = int(width - margin);
  const y_max = int(height);
  const x = get_random_between(margin, x_max);
  const y = get_random_between(margin, y_max);
  const color =
    BOX_COLORS[
      get_random_between(0, BOX_COLORS.length - 1)
    ];

  return {
    text: color,
    styles: {
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: color,
    },
  };
}
