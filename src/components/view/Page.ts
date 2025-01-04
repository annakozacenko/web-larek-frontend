import { Component } from "./Component";

export class Page extends Component {
protected basketButton: HTMLButtonElement;
protected basketCount: HTMLElement;


    constructor(container: HTMLElement) {
        super(container);
        this.basketButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;
        this.basketCount = ensureElement('.basket__count', this.container);

    }

    set basketCountValue(value: number) {
        this.basketCount.textContent = String(value.toString());
    }

    
}