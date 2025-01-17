import { categories } from "../../utils/constants";
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
            this.events.emit('ui:cardPreviewButton:clicked');
        });
    }

    toggleStatus(value: boolean) {
        const status = value ? 'Убрать из корзины' : 'Добавить';
        this.setText(this._button, status);
    }

    set category(value: string) {
        this.setText(this._category, value)

        Array.from(this._category.classList).forEach(className => {
            if (className.startsWith('card__category_')) {
                this._category.classList.remove(className);
            }
        });
        this.toggleClass(this._category, `card__category_${categories.get(value)}`, true)
    }


    set description(value: string) {
        this.setText(this._description, value)
    }

}