import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";


export class CardPreviewUI extends Card {
    _item: IProduct;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._category = ensureElement('.card__category', this.container);
        this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this._description = ensureElement('.card__text', this.container);

        this._button.addEventListener('click', () => {
            this.events.emit('ui:cardPreviewButton:clicked', this);
        });
    }

    toggleStatus(value: boolean) {
        const status = value ? 'Убрать из корзины' : 'Добавить';
        this._button.textContent = status;
    }

    render(card: IProduct): HTMLElement {

        this.setImage(this._image, card.image);
        this._category.textContent = card.category;
        this._description.textContent = card.description;

        return super.render(card);
    }
}