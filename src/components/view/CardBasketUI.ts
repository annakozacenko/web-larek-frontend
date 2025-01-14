import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";




export class CardBasketUI extends Card {
    protected _index: HTMLElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._index = ensureElement('.basket__item-index', this.container);
        this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this._button.addEventListener('click', () => {
            this.events.emit('ui:cardDeleteButton:clicked', this._item);
        });
    }


    render(card: IProduct): HTMLElement {
        this._item = card;
        return super.render(card);
    }
    set index(value: number) {
        this._index.textContent = String(value);
    }
}