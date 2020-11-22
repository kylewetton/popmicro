import {createClassedElement, handleError, getHookType} from '../../utils';

interface PopmicroSettings {
    element: string;
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
        

        switch(hookType) {
            case 'image' :
                inner.innerHTML = `<img class="popmicro__direct-image" src="${hook}" />`
                this.inlineDomPosition = null;
            break;

            case 'inline' :
                const content: HTMLElement | null = document.querySelector(hook);
                if (content) {
                    const parent = content.parentNode;
                    const nextSibling = content.nextElementSibling;

                    this.inlineDomPosition = {
                        parent,
                        sibling: nextSibling,
                    }

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
        this.inlineDomPosition = null;
    }




    private addEvents() {
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