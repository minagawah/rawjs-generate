export function GenericWrapper(args: {
    composer: Composer;
    options?: Options;
    wrapper_options?: Options;
}): GenericWrapperContext;
export type Composer = import('../types.js').Composer;
export type GenericWrapperContext = {
    id: string;
    el: HTMLElement;
    update: Update;
};
export type Options = {
    id?: string;
};
export type Update = (args: {
    composer: Composer;
    options?: Options;
}) => any;
