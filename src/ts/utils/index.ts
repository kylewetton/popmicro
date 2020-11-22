interface ErrorFn {
    <T>(entity: T, erroMessage: string, soft?: true | false) : T | null | never
}

interface CreateClassedElementFn {
    (tag: 'div' | 'button', classNames: string | string[]): Element
}


type PossibleHooks = 'image' | 'inline' | 'video' | null;

/**
 * An error handling utility that checks viability of entity
 * This either throws an error when soft is false
 * or creates a console warning when soft is true
 * 
 * @param {any} entity - The element/entity to check
 * @param {string} errorMessage - The error message
 * @param {boolean} soft - Soft mode logs a warning in the console 
 */
export const handleError: ErrorFn = (entity, errorMessage = "Something went wrong", soft = false) => {
    if (entity)
        return entity;

    if (soft) {
            console.warn(`Popmicro: ${errorMessage}`);
            return null;
        } else {
            throw Error(`Popmicro: ${errorMessage}`);
        }
}
/**
 * Creates a DOM element and returns it with classname/s 
 * 
 * @param {string} tag                 - Element type limited to div | button for Popmicro
 * @param {string | array } classNames - An array or string of classnames to add to the element
 */

export const createClassedElement: CreateClassedElementFn = (tag, classNames) => {
    const element: Element = document.createElement(tag);
    if (typeof classNames === 'string') {
        element.classList.add( classNames);
    }
     else if (typeof classNames === 'object' && classNames.length) {
        classNames.forEach(c => {
            element.classList.add(c);
        });
     }
    return element;
}


/**
 * Uses Regex to determine whether the trigger href is attempting to load
 * an image, inline content, or a video
 * 
 * @param {string} hook  - The href/hook
 */

export const getHookType = (hook: string) : PossibleHooks => {

    if (hook.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/) !== null)
        return 'image';
    
    if (hook.match(/^\.|\#/))
        return 'inline';

    return null;
}