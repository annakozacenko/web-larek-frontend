import { ICardActions } from "../../types";
import { categories } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";



export class CardCatalogUI extends Card {

    constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
        super(container, events);

        this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._category = ensureElement('.card__category', this.container);

        container.addEventListener('click', actions.onClick);
    }

    set category(value: string) {
        this.setText(this._category, value)
        this.toggleClass(this._category, `card__category_${categories.get(value)}`, true)
    }



}