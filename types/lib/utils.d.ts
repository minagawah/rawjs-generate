export function gen_hash(size?: number): string;
export function get_random_between(arg0: number, arg1: number): number;
export function debounce(f: Function, delay: number): () => void;
export const noop: () => void;
export const int: (arg0: number) => number;
export const get_screen_size: () => ScreenSize;
export type ScreenSize = {
    width: number;
    height: number;
};
