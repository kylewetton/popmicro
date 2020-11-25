interface ErrorFn {
    <T>(entity: T, erroMessage: string, soft?: true | false) : T | null | never
}

interface CreateClassedElementFn {
    (tag: 'div' | 'button', classNames: string | string[]): Element
}


type PossibleHooks = 'image' | 'inline' | 'video' | null;

interface CustomSizeType {
    width: string;
    height?: string;
}

export type SizeType = 'full' | 'none' | CustomSizeType;


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

/**
 * Set the size of the modal box shadow
 * 
 * @param {string} size 'none'| 'sm' | 'md' | 'lg' | 'xl' | <custom>
 */

export const setShadowType = (size: string = 'xl') => {
    
    const root = document.documentElement;
    let boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';

    switch(size) {
        case('none'):
            boxShadow = 'none';
        break;

        case('sm'):
            boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        break;
        
        case('md'):
            boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        break;

        case('lg'):
            boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        break;

        case('xl') :
            boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        break;

        default:
            boxShadow = size;
    }

    root.style.setProperty('--popmicro-shadow', boxShadow);

}

/**
 * Gets inline CSS based on the sizing type chosen. Either full width, a custom height/width, or none.
 * 
 * @param element       (private) popmicro__inner
 * @param sizeType      'none' (default) | 'full' | {width, height}
 */

export const getSizing = (element: HTMLElement, sizeType: SizeType) : {size: string; userContentSize: string;} => {
    let size = '';
    let userContentSize = 'min-height: 100%; width: 100%';
    switch(true) {
        case (sizeType === 'full') :
            size = 'overflow-y: auto; height: 100%; width: 100%';
        break;
        default:
        case (sizeType === 'none') :
            size = '';
            userContentSize = '';
        break;
        case (typeof sizeType === 'object' && sizeType.hasOwnProperty('width')) :
            size = `width: 100%; max-width: ${(sizeType as CustomSizeType).width};`;
            if ((sizeType as CustomSizeType).hasOwnProperty('height')) {
                size += `overflow-y: auto; height: 100%; max-height: ${(sizeType as CustomSizeType).height}`;
            }
    }
    
    return {size, userContentSize};
}