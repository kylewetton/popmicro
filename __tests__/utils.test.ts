import {handleError, getHookType, createClassedElement} from '../src/ts/utils';

beforeEach(() => {
    document.body.innerHTML = `<div class="popmicro"></div>`
});

describe('Utilities', () => {
    it('handleError: Returns a viable entry', () => {
        expect(handleError(true, "There's no element")).toBeTruthy();
    });

    it('handleError: Throws when soft is false', () => {
        expect(() => handleError(undefined, "There's no element", false)).toThrowError();
    });

    it('handleError: Console logs a warning when soft mode is set to true', () => {
        expect(handleError(undefined, "There's no element", true)).toBeNull();
    });
});

describe('Hook type handler', () => {
    it('Returns image type if its a url that ends with an image type', () => {
        expect(getHookType('http://domain.com/path/image.jpg')).toBe('image');
        expect(getHookType('relative/path/image.png')).toBe('image');
    });

    it('Returns inline type if its a class or ID', () => {
        expect(getHookType('.some-class')).toBe('inline');
        expect(getHookType('#some_id')).toBe('inline');
    });

    it('Returns null if it cant figure out what to do with it', () => {
        expect(getHookType('some string')).toBe(null);
    });
});

describe('Creating an element with classes', () => {
    it('Returns a div with with a single class', () => {
        document.body.innerHTML = ``;
        const classyElement = createClassedElement('div', 'foo');
        document.body.appendChild(classyElement);
        expect(document.body.innerHTML).toBe('<div class="foo"></div>')
    });

    it('Returns a div with multiple classes', () => {
        document.body.innerHTML = ``;
        const classyElement = createClassedElement('div', ['foo', 'bar', 'yeet']);
        document.body.appendChild(classyElement);
        expect(document.body.innerHTML).toBe('<div class="foo bar yeet"></div>')
    });
});