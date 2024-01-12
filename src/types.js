/**
 * @typedef CSSStyleDeclaration
 * @type {Object.<string, string>}
 */

/**
 * @typedef GenericProps
 * @type {Object}
 * @property {string} [id]
 * @property {string} [text]
 * @property {Array.<string>} [classes=[]]
 * @property {Object} [attributes={}]
 * @property {CSSStyleDeclaration} [styles={}] - TODO: Somehow having problems importing 'CSSStyleDeclaration' interface from RawJS...
 * @property {function} [onClick]
 */

/**
 * @typedef Composer
 * @type {function(): HTMLElement}
 */

// ------------------------------------------------------------
// For 'Broadcast Channel API', we have some type signatures.
//
// 'BroadcastMessageEvent' is a signature for the event
// given when listening to the API's 'message' event.
// We currently have only 'resize' and 'click' channels.
//
// 'BroadcastMessageHandler' is an event listener
// function that we have  for the event.
//
// When we broadcast messages, we give a peculiar shape to its data,
// and is defiend as 'BroadcastMessageData'.
// {payload} is the actual data part of the message.
// {action} specifies the type of actions to perform.
//
// 'BroadcastChannelCollection' is a simple placeholder
// which maps channel to their 'BroadcastChannel' instances.
// ------------------------------------------------------------

/**
 * @typedef BroadcastChannelName
 * @type {'resize' | 'click'}
 */

/**
 * @typedef BroadcastMessageDataAction
 * @type {'change-screen-size' | 'generate-box'}
 */

/**
 * @template {any} [P={}]
 * @typedef BroadcastMessageData
 * @type {Object}
 * @property {BroadcastMessageDataAction} action
 * @property {P} [payload]
 */

/**
 * @template {any} [P={}]
 * @typedef BroadcastMessageEvent
 * @type {Object}
 * @property {BroadcastMessageData<P>} [data]
 */

/**
 * @template {any} [P={}]
 * @typedef BroadcastMessageHandler
 * @type {function(BroadcastMessageEvent<P>): void}
 */

export default {};
