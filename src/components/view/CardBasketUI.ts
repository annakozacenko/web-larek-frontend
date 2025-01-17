import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";



export class CardBasketUI extends Card {
    protected _index: HTMLElement

    constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
        super(container, events);

        this._index = ensureElement('.basket__item-index', this.container);
        this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;

        this._button.addEventListener('click', actions.onClick);
    }


    set index(value: number) {
        this.setText(this._index, String(value))
    }
}