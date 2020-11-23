import {createClassedElement, handleError, getHookType, setShadowType} from '../../utils';

interface SizingType {
    width: string;
    height?: string;
}

interface PopmicroSettings {
    element: string;
    sizeType: 'full' | 'none' | SizingType;
    dropShadow: string;
}

interface PopmicroScaffold {
    [el: string]: Element;
}

interface InlineDomPositionRef {
    parent: Node | null;
    sibling: ChildNode | null;
}

type Triggers = NodeListOf<HTMLAnchorElement>;



const defaults: PopmicroSettings = {
    element: '.popmicro',
    sizeType: 'none',
    dropShadow: 'xl'
}

export default class Popmicro {
    settings: PopmicroSettings;
    scaffold: PopmicroScaffold;
    triggers: Triggers;
    inlineDomPosition: InlineDomPositionRef | null;
   
    constructor (settings: PopmicroSettings = defaults) {
        this.settings = Object.assign({}, defaults, settings);
        this.triggers = document.querySelectorAll(`a${this.settings.element}`)
        this.scaffold = {
            main: createClassedElement('div', 'popmicro__wrapper'),
            inner: createClassedElement('div', 'popmicro__inner'),
            close: createClassedElement('button', 'popmicro__close'),
        };
        this.inlineDomPosition = null;
        this.mount();
    }




   mount() {
       const triggerLength: number = this.triggers.length;
       handleError(triggerLength, `No link triggers have been found of type ${this.settings.element}`, true);
       this.scaffoldHTML();
       this.addEvents();
       this.hideHookedElements();
    }




    public open(hook: string) {
        const {main, inner} = this.scaffold;
        const hookType: string | null = getHookType(hook);

        const getSizing = (element: HTMLElement) : {size: string; userContentSize: string;} => {
            const {sizeType} = this.settings;
            let size = '';
            let userContentSize = 'height: 100%; width: 100%';
            switch(true) {
                default:
                case (sizeType === 'full') :
                    size = 'height: 100%; width: 100%';
                break;
                case (sizeType === 'none') :
                    size = '';
                break;
                case (typeof sizeType === 'object' && sizeType.hasOwnProperty('width')) :
                    size = `width: 100%; max-width: ${(sizeType as SizingType).width};`;
                    if ((sizeType as SizingType).hasOwnProperty('height')) {
                        size += `height: 100%; max-height: ${(sizeType as SizingType).height}`;
                    }
            }
            
            return {size, userContentSize};
        }
        

        switch(hookType) {
            case 'image' :
                
                inner.innerHTML = `<img class="popmicro__direct-image" src="${hook}" />`
                this.inlineDomPosition = null;
            break;

            case 'inline' :
                const content: HTMLElement | null = document.querySelector(hook);
                if (content) {
                    const {size, userContentSize} = getSizing(content);
                    const parent = content.parentNode;
                    const nextSibling = content.nextElementSibling;

                    this.inlineDomPosition = {
                        parent,
                        sibling: nextSibling,
                    }

                    content.style.cssText += userContentSize;
                   (inner as HTMLElement).style.cssText = size;

                   inner.innerHTML = '';
                   inner.appendChild(content);

                   if (content.classList.contains('popmicro__hide')) {
                       content.classList.remove('popmicro__hide');
                   }
                }
        }

        document.body.appendChild(main);
    }
    



    public close() {
        const {main, inner} = this.scaffold;
        const content = inner.querySelector(':scope > *');

        if (content) {
            if (!content.classList.contains('popmicro__direct-image')) {
                content.classList.add('popmicro__hide');
            }
        }

        if (content && this.inlineDomPosition?.sibling && this.inlineDomPosition?.parent) {
            this.inlineDomPosition.parent.insertBefore(content, this.inlineDomPosition.sibling);
        } else if (content && this.inlineDomPosition?.parent) {
            this.inlineDomPosition.parent.appendChild(content);
        } else {
            inner.innerHTML = '';
        }
        document.body.removeChild(main);
        (inner as HTMLElement).style.cssText = '';
        this.inlineDomPosition = null;
    }




    private addEvents() {

        this.scaffold.close.addEventListener('click', () => this.close())
        
        if (!this.triggers.length)
            return;
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                e.preventDefault();
                const t = e.target as HTMLAnchorElement;
                const href = t.getAttribute('href');
                href && this.open(href);
            })
        });
    }



    private scaffoldHTML() {
        const {main, inner, close} = this.scaffold;
        setShadowType(this.settings.dropShadow);
        main.append(close, inner);
    }



    private hideHookedElements() {
        this.triggers.forEach(trigger => {
            const hook = trigger.hasAttribute('href') && trigger.getAttribute('href');
            const hookType: string | null = getHookType(hook as string);
            if (hook && hookType && hookType !== 'image') {
                const hookedEl = document.querySelector(hook);
                hookedEl?.classList.add('popmicro__hide');
            }
        })
    }
}