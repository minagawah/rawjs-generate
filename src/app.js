/**
 * As you can see, we are composing
 * 'Content' and 'Footer' here.
 * You also notice that these
 * components are wrapped with
 * 'GenericWrapper'. By wrapping
 * components with 'GenericWrapper',
 * you can freely remove components
 * and replace them with new ones.
 * Unlike React which automatically
 * takes care of adding and removing
 * components, it requires explicit
 * operations in RawJS.
 *
 * Here, we listen to 'resize' events.
 * When screen size changes as device
 * switches between PC and mobile,
 * we remove `Content` and `Footer`,
 * and re-attach them.
 *
 * Of course, we can use CSS styles to
 * make the page responsive. However,
 * there are cases when we want to
 * change the page layout dramatically.
 * For this, we need to manipulate
 * page's DOM elements. This module
 * intends to show an example doing so.
 *
 * @module rawgen/app
 */

import { raw } from '@squaresapp/rawjs';

import {
  CONTENT_ID,
  CONTENT_WRAPPER_ID,
  CONTENT_HEIGHT_PC,
  FOOTER_ID,
  FOOTER_WRAPPER_ID,
  FOOTER_HEIGHT_PC,
  FOOTER_HEIGHT_MOBILE,
} from './constants';

import { start_screen_size } from './services/screen_size';
import { GenericWrapper } from './services/generic_wrapper';
import { Content } from './components/content';
import { Footer } from './components/footer';

/**
 * @typedef GenericWrapperContext
 * @type {import('./services/generic_wrapper.js').GenericWrapperContext}
 */

/**
 * @typedef WrapperKey
 * @type {'content' | 'footer'}
 */

/**
 * @typedef Wrappers
 * @type {Object.<WrapperKey, GenericWrapperContext>}
 */

/**
 * @public
 * @function
 * @returns {HTMLElement}
 */
export const App = () => {
  /** @type {Wrappers} */
  const wrap = {};

  /** @type {GenericWrapperContext} */
  wrap.content = GenericWrapper({
    composer: () => Content(),
    options: { id: CONTENT_ID },
    wrapper_options: {
      id: CONTENT_WRAPPER_ID,
    },
  });

  /** @type {GenericWrapperContext} */
  wrap.footer = GenericWrapper({
    composer: () => Footer(),
    options: { id: FOOTER_ID },
    wrapper_options: { id: FOOTER_WRAPPER_ID },
  });

  start_screen_size({
    handler: make_resize_handler(wrap),
  });

  return raw.div(
    { id: 'wrapper' },
    wrap.content.el,
    wrap.footer.el
  );
};

/**
 * @typedef ScreenSizePayload
 * @type {import('./services/screen_size.js').ScreenSizePayload}
 */

/**
 * @typedef ResizeMessageHandler
 * @type {import('./types.js').BroadcastMessageHandler<ScreenSizePayload>}
 */

/**
 * This is a factory function.
 * @private
 * @function
 * @param {Wrappers} wrap
 * @returns {ResizeMessageHandler}
 */
function make_resize_handler(wrap) {
  /**
   * So, it returns another function.
   * @type {ResizeMessageHandler}
   */
  return ({ data }) => {
    // It is not really necessary to
    // check 'action' here because we
    // have only 1 action type for
    // 'resize' channel. Checking it
    // just in case...
    if (data?.action !== 'change-screen-size') return;

    const styles = get_styles(data?.payload);

    wrap.content.update({
      composer: () => Content({ styles: styles.content }),
      options: { id: CONTENT_ID },
    });

    wrap.footer.update({
      composer: () => Footer({ styles: styles.footer }),
      options: { id: FOOTER_ID },
    });
  };
}

/**
 * @typedef CSSStyles
 * @type {import('./types.js').CSSStyleDeclaration}
 */

/**
 * @typedef StylesCollection
 * @type {Object.<'content' | 'footer', CSSStyles | null>}
 */

/**
 * @private
 * @function
 * @param {ScreenSizePayload} [payload]
 * @returns {StylesCollection}
 */
function get_styles(payload) {
  const { is_mobile = false, height: screen_h } =
    payload || {};

  /**
   * @type {StylesCollection}
   */
  const styles = { content: null, footer: null };

  if (screen_h) {
    if (is_mobile) {
      const footer_h = FOOTER_HEIGHT_MOBILE;
      styles.content = {
        height: `calc(${screen_h}px - ${footer_h})`,
      };
      styles.footer = {
        height: footer_h,
        position: 'fixed',
        bottom: '0px',
        left: '0px',
      };
    } else {
      styles.content = { height: CONTENT_HEIGHT_PC };
      styles.footer = { height: FOOTER_HEIGHT_PC };
    }
  }

  return styles;
}
