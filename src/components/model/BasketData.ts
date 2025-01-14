import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class BasketData {
    protected _items: IProduct[] = [];
    protected _total: number;
    protected _amount: number;


    constructor(protected events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct) {
        this._items.push(product);
        this.events.emit('model:basket:changed');
    };
    removeProduct(id: string) {
        this._items = this._items.filter((item) => item.id !== id);
        this.events.emit('model:basket:changed');
    };
    clearBasket() {
        this._items = [];
        this.events.emit('model:basket:changed');
    };
    get items(): IProduct[] {
        return this._items;
    };

    get total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    };
    get amount(): number {
        return this._items.length;
    };

    isProductInBasket(product: IProduct): boolean {
        return this._items.some(item => item.id === product.id);
    }

}
