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


    constructor( container: HTMLElement, protected events:IEvents) {
        super(container);
        this._title = ensureElement('.card__title', this.container);
        this._price = ensureElement('.card__price', this.container);        
    }


    render(card: IProduct): HTMLElement {
        this._title.textContent = card.title;
        const priceText = card.price === null ? 'Бесценно' : formatNumber(card.price) + ' синапсов';
        this.setText(this._price, priceText);
        return super.render();
    }
}