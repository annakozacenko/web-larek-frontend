import { IProduct } from "../../types";
import { ensureElement, formatNumber } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";


export class Card extends Component {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _description?: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._title = ensureElement('.card__title', this.container);
        this._price = ensureElement('.card__price', this.container);

    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number | null) {
        this.setText(this._price, value === null ? 'Бесценно' : formatNumber(value) + ' синапсов');
    }

    set image(value: string) {
        this.setImage(this._image, value)
    }

    render(card: IProduct): HTMLElement {
        return super.render(card);
    }
}