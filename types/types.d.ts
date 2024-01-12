declare const _default: {};
export default _default;
export type CSSStyleDeclaration = {
    [x: string]: string;
};
export type GenericProps = {
    id?: string;
    text?: string;
    classes?: Array<string>;
    attributes?: Object;
    styles?: CSSStyleDeclaration;
    onClick?: Function;
};
export type Composer = () => HTMLElement;
export type BroadcastChannelName = 'resize' | 'click';
export type BroadcastMessageDataAction = 'change-screen-size' | 'generate-box';
export type BroadcastMessageData<P extends unknown = {}> = {
    action: BroadcastMessageDataAction;
    payload?: P;
};
export type BroadcastMessageEvent<P extends unknown = {}> = {
    data?: BroadcastMessageData<P>;
};
export type BroadcastMessageHandler<P extends unknown = {}> = (arg0: BroadcastMessageEvent<P>) => void;
