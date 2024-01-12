/**
 * @module rawgen/components/box/index
 */

import {
  BOX_SIZE,
  ELEMENT_DESTROY_DURATION_MSEC,
} from '../../constants';

import { gen_hash } from '../../lib/utils';
import { GenericMeta } from '../../services/generic_meta';
import { BoxElem } from './elem';

// We're making the CSS animation
const animation = `box-anim ${
  ELEMENT_DESTROY_DURATION_MSEC / 1000
}s`;

const size = `${BOX_SIZE}px`;

/**
 * @typedef {import('../../types.js').GenericProps} Props
 */

/**
 * @typedef GenericMetaContext
 * @type {import('../../services/generic_meta.js').GenericMetaContext}
 */

/**
 * @public
 * @function
 * @param {Props} options
 * @returns {GenericMetaContext}
 */
export const Box = ({ text, styles }) => {
  if (!text) throw new Error('No text');

  const id = `box-${gen_hash(8)}`;

  const self = GenericMeta({
    composer: () =>
      BoxElem({
        id,
        text,
        styles: {
          width: size,
          height: size,
          animation,
          ...styles,
        },
      }),
    options: { id },
  });

  // We want the box to be self-
  // terminated in a few seconds.
  setTimeout(() => {
    self.destroy();
  }, ELEMENT_DESTROY_DURATION_MSEC);

  return self;
};
