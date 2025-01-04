import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class CardCatalogUI extends Component {

    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardCategory: HTMLElement;
    protected cardPrice: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.cardCategory = ensureElement('.card__category', this.container);
        this.cardPrice = ensureElement('.card__price', this.container);
    }

set title(value: string) {
    this.setText(this.cardTitle, value);
}

}