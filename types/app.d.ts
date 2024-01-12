export function App(): HTMLElement;
export type ScreenSizePayload = import('./services/screen_size.js').ScreenSizePayload;
export type ResizeMessageHandler = import('./types.js').BroadcastMessageHandler<ScreenSizePayload>;
export type CSSStyles = import('./types.js').CSSStyleDeclaration;
export type StylesCollection = any;
export type GenericWrapperContext = import('./services/generic_wrapper.js').GenericWrapperContext;
export type WrapperKey = 'content' | 'footer';
export type Wrappers = any;
