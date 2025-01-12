import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";




export class CardBasketUI extends Card {
    _item: IProduct;

    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardDeleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this.cardDeleteButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this.cardDeleteButton.addEventListener('click', () => {
            this.events.emit('ui:cardDeleteButton:clicked', this._item);
        });
    }

    toggleStatus(value: boolean) {
        const status = value ? 'Убрать из корзины' : 'Добавить';
        this.cardDeleteButton.textContent = status;
    }

    render(card: IProduct): HTMLElement {
        this._item = card;
        return super.render(card);
    }
}