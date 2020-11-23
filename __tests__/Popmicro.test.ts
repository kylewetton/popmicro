import Popmicro from '../src/ts/components/core/Popmicro';

const markup = `
<a href="#content" class="popmicro"></a>
<div id="parent">
    <div id="prev_sibling"></div>  
    <div class="popmicro__hide" id="content"></div>
    <div id="next_sibling"></div>
</div>  
`;

document.body.innerHTML = markup;

beforeEach(() => {
    document.body.innerHTML = markup;
});

const popmicro = new Popmicro();

describe('Initialization', () => {

    let mountedSpy: jest.SpyInstance = jest.spyOn(popmicro, 'mount').mockImplementation(() => 'Mounted');

    it('Calls the mount method on instantiation', () => {
        expect(popmicro.mount()).toBe('Mounted');
    });

    it('Creates scaffold hierarchy with elements', () => {
        expect(popmicro.scaffold.main.innerHTML).toMatch(/div/);
    });

    it('Finds default .popmicro trigger', () => {
        expect(popmicro.triggers).toHaveLength(1);
    });

    it('Scaffolded Elements have classes', () => {
        expect(popmicro.scaffold.main.outerHTML).toMatch(/__wrapper/);
        expect(popmicro.scaffold.main.outerHTML).toMatch(/__inner/);
        expect(popmicro.scaffold.main.outerHTML).toMatch(/__close/);
    });
});

describe('Open method', () => {

    const popmicro = new Popmicro();

    it('Moves the inline content when the hook is an object identifier', () => {
        popmicro.open('#content');
        expect(popmicro.scaffold.inner.innerHTML).toMatch(/id="content"/);
    });

    it('Builds a position reference with a parent node', () => {
        popmicro.open('#content');
        expect(popmicro.inlineDomPosition).toHaveProperty('parent');
        expect(popmicro.inlineDomPosition?.parent).toBeTruthy();
        expect(popmicro.inlineDomPosition?.sibling).toBeTruthy();
    });

    it('Appends an image element when the hook is a URL', () => {
        const path = 'http://www.something.com/path/to/image.jpg';
        popmicro.open(path);
        expect(popmicro.scaffold.inner.innerHTML).toMatch(/img/);
        expect(popmicro.scaffold.inner.innerHTML).toMatch(/image.jpg/)
    });
});

describe('Close method', () => {
    const popmicro = new Popmicro();

    it('Moves the out of the DOM and into the modal, and moves it back in place', () => {
        popmicro.open('#content');

        expect(document.body.innerHTML).not.toBe(markup);
        expect(popmicro.scaffold.inner.innerHTML).toMatch(/id="content"/);
        popmicro.close();
        expect(document.body.innerHTML.replace(/\s/g, '')).toBe(markup.replace(/\s/g, ''));
    });

    it('Opening removes the hide class', () => {
        const c = document.getElementById('content');
        popmicro.open('#content');
        expect(c?.classList).not.toContain('popmicro__hide');
    });

    it('Closing adds the hide class back onto the element', () => {
        const c = document.getElementById('content');
        popmicro.open('#content');
        popmicro.close();
        expect(c?.classList).toContain('popmicro__hide');
    });
});

