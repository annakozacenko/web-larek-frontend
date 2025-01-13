import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";




export class CardBasketUI extends Card {

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this._button.addEventListener('click', () => {
            this.events.emit('ui:cardDeleteButton:clicked', this._item);
        });
    }

    toggleStatus(value: boolean) {
        const status = value ? 'Убрать из корзины' : 'Добавить';
        this._button.textContent = status;
    }

    render(card: IProduct): HTMLElement {
        this._item = card;
        return super.render(card);
    }
}