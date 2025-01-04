import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export class CardPreviewUI extends Component<IProduct> {

    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardCategory: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected cardDescription: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.cardCategory = ensureElement('.card__category', this.container);
        this.cardPrice = ensureElement('.card__price', this.container);
        this.cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this.cardDescription = ensureElement('.card__text', this.container);
    }

toggleStatus(value: boolean) {
 const status = value ? 'Убрать из корзины' : 'Добавить';
 this.cardButton.textContent = status;
 //ПР9-возможно надо будет добавить добавлление/удаление класса
}

render(data: Partial<IProduct>): HTMLElement {
    Object.assign(this as object, data);
    return this.container;
}
}