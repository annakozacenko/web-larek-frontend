import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class BasketData {
    protected items: IProduct[] = [];
    protected total: number;
    protected amount: number;


    constructor(protected events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct) {
        this.items.push(product);
        this.events.emit('basket:product-added');
    };
    removeProduct(id: string) {
        this.items = this.items.filter((item) => item.id !== id);
        this.events.emit('basket:product-removed');
    };
    clearBasket() {
        this.items = [];
        this.events.emit('basket:cleared');
    };
    get Items(): IProduct[] {
        return this.items;
    };
    
    get Total(): number {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    };
    get Amount(): number {
        return this.items.length;
    };

    isProductInBasket(product: IProduct): boolean {
        return this.items.some(item => item.id === product.id);
      }
    
}
