/**
 * @module rawgen/components/footer
 */

import { raw } from '@squaresapp/rawjs';

import {
  STATUS_ON,
  STATUS_OFF,
  ELEMENT_DESTROY_DURATION_MSEC,
  FOOTER_ID,
} from '../constants';
import { Button } from './button';

const BUTTON_LABEL = {
  [STATUS_ON]: 'Stop',
  [STATUS_OFF]: 'Start',
};

// It has 'Stop/Start' button. When
// clicked, it will broadcast
// a message to 'click' channel
// with its action 'generate-box'.
// A listener in 'Content' component
// subscribes to this channel.
// 'Content' component is where
// random box generation takes
// place, and when having
// STATUS_OFF is received, it
// will stop generating boxes.

const ch = new BroadcastChannel('click');

/**
 * @typedef Status
 * @type {import('../constants.js').Status}
 */

/**
 * @public
 * @function
 * @param {import('../types.js').GenericProps} [props]
 * @returns {HTMLElement}
 */
export const Footer = props => {
  const text = `
Click the button for toggling the status for generating DOM elements.
Each DOM element self-destroy in ${
    ELEMENT_DESTROY_DURATION_MSEC / 1000
  } seconds.
  `;

  const button = Button({
    text: 'Stop',
    classes: ['button'],
    attributes: { id: 'btn-generate-dom' },
    onClick: on_click,
  });

  /**
   * @type {Status}
   */
  let status = STATUS_ON;

  return raw.div(
    { id: FOOTER_ID },
    props?.styles || {},
    button,
    raw.text(text)
  );

  // We want the bellow function
  // defined within 'Footer' because
  // we want to change 'status' which
  // is internally defined in 'Footer'.

  /**
   * @private
   */
  function on_click() {
    status = status === STATUS_ON ? STATUS_OFF : STATUS_ON;
    button.innerText = BUTTON_LABEL[status];

    /**
     * @type {import('../types.js').BroadcastMessageData<Status>}
     */
    const data = {
      action: 'generate-box',
      payload: status,
    };

    ch.postMessage(data);
  }
};
