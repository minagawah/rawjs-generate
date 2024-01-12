/**
 * Wraps an element so that lets you
 * freely (1) create, (2) destroy, and
 * (3) re-attach elements. As you can
 * see, 'GenericWrapper' wraps
 * 'GenericMeta' instance. Although
 * 'GenericMeta' lets you create/destroy
 * elements, it does not allow you to
 * re-attach elements simply because
 * it does not have a parent element
 * to append to. So, 'GenericWrapper'
 * adds an own wrapper so that it can
 * freely remove or re-attach elements.
 *
 * @module rawgen/services/generic_wrapper
 */

import { raw } from '@squaresapp/rawjs';
import { gen_hash } from '../lib/utils';
import { GenericMeta } from './generic_meta';

/**
 * @typedef Composer
 * @type {import('../types.js').Composer}
 */

/**
 * This is the returned type.
 * @typedef GenericWrapperContext
 * @type {Object}
 * @property {string} id
 * @property {HTMLElement} el
 * @property {Update} update
 */

/**
 * @typedef Options
 * @type {Object}
 * @property {string} [id]
 */

/**
 * @callback Update
 * @param {Object} args
 * @param {Composer} args.composer
 * @param {Options} [args.options={}]
 * @throws {Error}
 */

/**
 * @public
 * @function
 * @throws {Error}
 * @param {Object} args
 * @param {Composer} args.composer
 * @param {Options} [args.options={}]
 * @param {Options} [args.wrapper_options={}]
 * @returns {GenericWrapperContext}
 */
export const GenericWrapper = args => {
  let {
    composer,
    options = {},
    wrapper_options = {},
  } = args;

  if (!composer) throw new Error('No composer');

  const child = GenericMeta({ composer, options });
  const parent_id =
    wrapper_options.id || `wrapper-${gen_hash(10)}`;
  const parent_el = raw.div({ id: parent_id });

  _append();

  return Object.freeze({
    id: parent_id,
    el: parent_el,
    update,
  });

  /**
   * @private
   * @type {function(): void}
   */
  function _append() {
    parent_el.append(child.el);
  }

  /** @type {Update} */
  function update(args) {
    composer = args?.composer ?? composer;
    options = args?.options ?? options;
    child.destroy();
    child.create({ composer, options });
    _append();
  }
};
