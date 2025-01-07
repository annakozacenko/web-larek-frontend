import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { Component } from "./Component";



export class CardBasketUI extends Component{

    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardDeleteButton: HTMLButtonElement;

    constructor(container: HTMLElement,protected events: EventEmitter) {
        super(container);
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardPrice = ensureElement('.card__price', this.container);
        this.cardDeleteButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this.cardDeleteButton.addEventListener('click', () => {
            this.events.emit('cardPreviewButton:clicked');
        });
    }

toggleStatus(value: boolean) {
 const status = value ? 'Убрать из корзины' : 'Добавить';
 this.cardDeleteButton.textContent = status;
 //ПР9-возможно надо будет добавить добавлление/удаление класса
}

render(data: Partial<IProduct>): HTMLElement {
    Object.assign(this as object, data);
    return this.container;
}
}