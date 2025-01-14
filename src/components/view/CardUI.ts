import { IProduct } from "../../types";
import { ensureElement, formatNumber } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}
export class Card extends Component {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _description?: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
        super(container);
        this._title = ensureElement('.card__title', this.container);
        this._price = ensureElement('.card__price', this.container);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number | null) {
        this.setText(this._price, value === null ? 'Бесценно' : formatNumber(value) + ' синапсов');
    }



    render(card: IProduct): HTMLElement {

        // this.title = card.title;
        // this.price = card.price;
        // const priceText = card.price === null ? 'Бесценно' : formatNumber(card.price) + ' синапсов';
        //  this.setText(this._price, priceText);
        return super.render(card);
    }
}