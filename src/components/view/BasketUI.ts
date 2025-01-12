
import { ensureElement, formatNumber } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";





export class BasketUI extends Component {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement('.basket__list', this.container);
        this._total = ensureElement('.basket__price', this.container);
        this._button = ensureElement('.button', this.container) as HTMLButtonElement;

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('ui:basket:confirmed');
            });
        }
        this.items = [];

    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.innerHTML = '';
        }
    }
    set total(total: number) {
        this.setText(this._total, formatNumber(total) + ' синапсов');
    }

    toggleButton(state: boolean) {
        this.setDisabled(this._button, !state);

    }
}

