
import { IProduct } from "../../types";
import { ensureElement} from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./CardUI";



export class CardCatalogUI extends Card {
    _item: IProduct;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._category = ensureElement('.card__category', this.container);
       

        this.container.addEventListener('click', () => {
            this.events.emit('cardCatalog:clicked', this._item);
        });
    }

    render(card: IProduct): HTMLElement {

        this.setImage(this._image, card.image);
        this._category.textContent = card.category;
        this._item = card;


        return super.render(card);
    }


}