import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";


export class CardPreviewUI extends Card {

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

    set category(value: string) {
        this.setText(this._category, value)
    }

    set image(value: string) {
        this.setImage(this._image, value)
    }

    set description(value: string) {
        this.setText(this._description, value)
    }

    render(card: IProduct): HTMLElement {
        this.image = card.image;
        this.category = card.category;
        this.description = card.description;

        return super.render(card);
    }
}