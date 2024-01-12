/**
 * @module rawgen/components/button
 */

import { raw } from '@squaresapp/rawjs';
import { noop } from '../lib/utils';

/**
 * @public
 * @function
 * @throws {Error}
 * @param {import('../types.js').GenericProps} props
 * @returns {HTMLElement}
 */
export const Button = props => {
  const text = props?.text;
  if (!text) throw new Error('No text');

  const classes = props.classes || [];
  const attributes = props.attributes || {};
  const styles = props.styles || {};
  const given_click_handler = props.onClick || noop;

  return raw.get(
    raw.button(classes, attributes, styles, raw.text(text))
  )(raw.on('click', click_handler));

  /**
   * @private
   * @function
   * @param {MouseEvent} e
   */
  function click_handler(e) {
    return given_click_handler(e);
  }
};
