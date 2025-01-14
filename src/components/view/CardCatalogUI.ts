
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card, ICardActions } from "./CardUI";



export class CardCatalogUI extends Card {

    constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
        super(container, events, actions);

        this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._category = ensureElement('.card__category', this.container);


        // this.container.addEventListener('click', () => {
        //     this.events.emit('ui:cardCatalog:clicked', this._item);
        // });
    }

    set category(value: string) {
        this.setText(this._category, value)
    }

    set image(value: string) {
        this.setImage(this._image, value)
    }

    render(card: IProduct): HTMLElement {

        this.image = card.image;
        this.category = card.category;

        return super.render(card);
    }


}