/**
 * Wraps an element so that lets you
 * freely (1) create, and (2) destroy
 * elements. However, if you wanted to
 * append an element for the second
 * time on, you need 'GenericWrapper'.
 * Sure, we have 'create' method, and
 * it sounds like it serves the purpose,
 * Unfortunately, it doesn't...
 * Although 'create' method is in charge
 * of creating elements, appending
 * elements to the parent is a whole
 * another story which 'create' is
 * totally not aware of, and we need
 * another set of mechanism. Hence,
 * we have 'GenericWrapper' when
 * we wanted to re-attach elements.
 *
 * @module rawgen/services/generic_meta
 */

import { gen_hash } from '../lib/utils';

/**
 * @typedef Composer
 * @type {import('../types.js').Composer}
 */

/**
 * This is the returned type.
 * @typedef GenericMetaContext
 * @type {Object}
 * @property {Identity} id - A getter for 'id'
 * @property {Element} el - A getter for 'el'
 * @property {Create} create
 * @property {Destroy} destroy
 */

/**
 * @typedef {string} Identity
 */

/**
 * @typedef {HTMLElement} Element
 */

/**
 * @typedef IdentityGetter
 * @type {function(): Identity}
 */

/**
 * @typedef ElementGetter
 * @type {function(): Element}
 */

/**
 * @callback Create
 * @param {Object} [args={}]
 * @param {Composer} [args.composer]
 * @param {Options} [args.options]
 * @returns {void}
 */

/**
 * @typedef {function(): void} Destroy
 */

/**
 * @typedef Options
 * @type {Object}
 * @property {string} [id]
 */

/**
 * @public
 * @function
 * @throws {Error}
 * @param {Object} args
 * @param {Composer} args.composer
 * @param {Options} [args.options={}]
 * @returns {GenericMetaContext}
 */
export const GenericMeta = args => {
  if (!args?.composer) throw new Error('No composer');

  let composer = args.composer;
  let id = args?.options?.id || `meta-${gen_hash(10)}`;
  let el = composer();

  const self = Object.freeze(
    Object.create(
      {
        create,
        destroy,
      },
      // 'Object.create' takes
      // the second argument if you
      // wanted fine grained definitions
      // for the properties you are
      // defining, and it has to be
      // described using the object
      // property descriptor syntax.
      // For this module, we want
      // 'self.id' to be an accessor
      // to the internally available
      // 'id'. Likewise, we want
      // 'self.el' for 'el'.
      {
        id: { get: id_getter },
        el: { get: el_getter },
      }
    )
  );

  self.create();

  return self;

  /** @type {IdentityGetter} */
  function id_getter() {
    return id;
  }

  /** @type {ElementGetter} */
  function el_getter() {
    return el;
  }

  /** @type {Create} */
  function create(args = {}) {
    composer = args?.composer ?? composer;
    id = args?.options?.id ?? id;
    el = composer();
  }

  /**
   * @type {Destroy}
   * @this {GenericMetaContext}
   */
  function destroy() {
    if (!el) return;

    const parent = el.parentNode;

    if (parent) {
      // console.log(
      //   `[services/generic_meta] (destroy) ::::${
      //     this.id ? ' (' + this.id + ')' : ''
      //   }`
      // );
      parent.removeChild(el);
    }

    el = null;
  }
};
