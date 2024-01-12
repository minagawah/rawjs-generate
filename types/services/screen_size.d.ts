export function start_screen_size(options?: Options): void;
export function use_screen_size(handler: MessageHandler): void;
export type ScreenSize = import('../lib/utils.js').ScreenSize;
export type ScreenSizePayload = ScreenSize & {
    is_mobile: boolean;
};
export type Options = {
    delay?: number;
    delay_init?: number;
    handler?: MessageHandler;
};
export type MessageHandler = import('../types.js').BroadcastMessageHandler<ScreenSizePayload>;
