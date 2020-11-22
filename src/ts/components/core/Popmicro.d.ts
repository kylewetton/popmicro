interface PopmicroSettings {
    element: string;
}
interface PopmicroScaffold {
    [el: string]: Element;
}
declare type Triggers = NodeListOf<HTMLAnchorElement>;
export default class Popmicro {
    settings: PopmicroSettings;
    scaffold: PopmicroScaffold;
    triggers: Triggers;
    constructor(settings?: PopmicroSettings);
    mount(): void;
    open(hook: string): void;
    private addEvents;
    private scaffoldHTML;
}
export {};
//# sourceMappingURL=Popmicro.d.ts.map