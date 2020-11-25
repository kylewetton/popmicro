import {createClassedElement, handleError, getHookType, getSizing, setShadowType, SizeType} from '../../utils';
import {CloseButton} from '../ui';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface PopmicroSettings {
    element: string;
    sizeType: SizeType;
    dropShadow: string;
    bgOpacity: number;
    lockScrolling: boolean;
    hideCloseButton: boolean;
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
    dropShadow: 'xl',
    bgOpacity: 0.8,
    lockScrolling: true,
    hideCloseButton: false
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
            close: createClassedElement('button', this.settings.hideCloseButton ? ['popmicro__hide', 'popmicro__close'] : 'popmicro__close'),
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
        const {lockScrolling} = this.settings;
        const {main, inner} = this.scaffold;
        const hookType: string | null = getHookType(hook);

        if (lockScrolling)
            disableBodyScroll(inner);
        

        switch(hookType) {
            case 'image' :
                
                inner.innerHTML = `<img class="popmicro__direct-image" src="${hook}" />`
                this.inlineDomPosition = null;
            break;

            case 'inline' :
                const content: HTMLElement | null = document.querySelector(hook);
                if (content) {
                    const {size, userContentSize} = getSizing(content, this.settings.sizeType);
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
        const {lockScrolling} = this.settings;
        const content = inner.querySelector(':scope > *');

        if (lockScrolling)
            enableBodyScroll(inner);

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
                const t = e.currentTarget as HTMLAnchorElement;
                const href = t.getAttribute('href');
                href && this.open(href);
            })
        });
    }



    private scaffoldHTML() {
        const {main, inner, close} = this.scaffold;
        const root = document.documentElement;

        setShadowType(this.settings.dropShadow);
        root.style.setProperty('--popmicro-bg-opacity', `${this.settings.bgOpacity}`);
        close.innerHTML = CloseButton();
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