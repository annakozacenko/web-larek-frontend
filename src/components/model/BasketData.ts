import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class BasketData {
    protected items: IProduct[] = [];
    protected total: number = 0;
    protected amount: number = 0;


    constructor(protected events: IEvents) {}

    addProduct(product: IProduct) {
        this.items.push(product);
        this.events.emit('basket:changed');
    };
    removeProduct(id: string) {
        this.items = this.items.filter((item) => item.id !== id);
        this.events.emit('basket:changed');
    };
    clearBasket() {
        this.items = [];
        this.events.emit('basket:changed');
    };
    getItems(): IProduct[] {
        return this.items;

    };
    
    getTotal(): number {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    };
    getAmount(): number {
        return this.items.length;
    };
}
