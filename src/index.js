/**
 * ************************************
 * rawjs-generate
 * ************************************
 * A sample RawJS app with PUB/SUB
 * messaging to generate/destroy DOM
 * elements.
 *
 * @module rawgen/index
 */

import { App } from './app';

// ------------------------------------
// This is where the app begins.
// ------------------------------------

window.addEventListener('load', () => {
  const el = document.querySelector('#app');
  if (el) {
    el.append(App());
  }
});
