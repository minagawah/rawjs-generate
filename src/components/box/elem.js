/**
 * @module rawgen/components/box/elem
 */

import { raw } from '@squaresapp/rawjs';

/**
 * @typedef {import('../../types.js').GenericProps} Props
 */

/**
 * @public
 * @function
 * @throws {Error}
 * @param {Props} props
 * @returns {HTMLElement}
 */
export const BoxElem = props => {
  const { id, text, styles = {} } = props || {};
  if (!id) throw new Error('No id');
  return raw.div('box', styles, raw.text(text || id));
};
