export function GenericMeta(args: {
    composer: Composer;
    options?: Options;
}): GenericMetaContext;
export type Composer = import('../types.js').Composer;
export type GenericMetaContext = {
    id: Identity;
    el: Element;
    create: Create;
    destroy: Destroy;
};
export type Identity = string;
export type Element = HTMLElement;
export type IdentityGetter = () => Identity;
export type ElementGetter = () => Element;
export type Create = (args?: {
    composer?: Composer;
    options?: Options;
}) => void;
export type Destroy = () => void;
export type Options = {
    id?: string;
};
