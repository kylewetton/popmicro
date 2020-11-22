interface ErrorFn {
    <T>(entity: T, erroMessage: string, soft?: true | false): T | null | never;
}
interface CreateClassedElementFn {
    (tag: 'div' | 'button', classNames: string | string[]): Element;
}
interface ReinstateEventsFn {
    (original: HTMLElement, clone: HTMLElement): Element;
}
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
export declare const reinstateEventListeners: ReinstateEventsFn;
export {};
//# sourceMappingURL=index.d.ts.map