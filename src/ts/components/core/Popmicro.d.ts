import { SizeType } from '../../utils';
interface PopmicroSettings {
    element: string;
    sizeType: SizeType;
    dropShadow: string;
    bgOpacity: number;
    lockScrolling: boolean;
}
interface PopmicroScaffold {
    [el: string]: Element;
}
interface InlineDomPositionRef {
    parent: Node | null;
    sibling: ChildNode | null;
}
declare type Triggers = NodeListOf<HTMLAnchorElement>;
export default class Popmicro {
    settings: PopmicroSettings;
    scaffold: PopmicroScaffold;
    triggers: Triggers;
    inlineDomPosition: InlineDomPositionRef | null;
    constructor(settings?: PopmicroSettings);
    mount(): void;
    open(hook: string): void;
    close(): void;
    private addEvents;
    private scaffoldHTML;
    private hideHookedElements;
}
export {};
