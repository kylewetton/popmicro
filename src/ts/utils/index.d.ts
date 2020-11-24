interface ErrorFn {
    <T>(entity: T, erroMessage: string, soft?: true | false): T | null | never;
}
interface CreateClassedElementFn {
    (tag: 'div' | 'button', classNames: string | string[]): Element;
}
declare type PossibleHooks = 'image' | 'inline' | 'video' | null;
interface CustomSizeType {
    width: string;
    height?: string;
}
export declare type SizeType = 'full' | 'none' | CustomSizeType;
/**
 * An error handling utility that checks viability of entity
 * This either throws an error when soft is false
 * or creates a console warning when soft is true
 *
 * @param {any} entity - The element/entity to check
 * @param {string} errorMessage - The error message
 * @param {boolean} soft - Soft mode logs a warning in the console
 */
export declare const handleError: ErrorFn;
/**
 * Creates a DOM element and returns it with classname/s
 *
 * @param {string} tag                 - Element type limited to div | button for Popmicro
 * @param {string | array } classNames - An array or string of classnames to add to the element
 */
export declare const createClassedElement: CreateClassedElementFn;
/**
 * Uses Regex to determine whether the trigger href is attempting to load
 * an image, inline content, or a video
 *
 * @param {string} hook  - The href/hook
 */
export declare const getHookType: (hook: string) => PossibleHooks;
/**
 * Set the size of the modal box shadow
 *
 * @param {string} size 'none'| 'sm' | 'md' | 'lg' | 'xl' | <custom>
 */
export declare const setShadowType: (size?: string) => void;
/**
 * Gets inline CSS based on the sizing type chosen. Either full width, a custom height/width, or none.
 *
 * @param element       (private) popmicro__inner
 * @param sizeType      'none' (default) | 'full' | {width, height}
 */
export declare const getSizing: (element: HTMLElement, sizeType: SizeType) => {
    size: string;
    userContentSize: string;
};
export {};
