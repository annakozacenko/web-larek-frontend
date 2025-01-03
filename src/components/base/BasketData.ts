import { IProduct } from "../../types";

export class BasketData {
    protected items: IProduct[] = [];
    protected total: number = 0;
    protected amount: number = 0;


    constructor() {}

    addProduct(product: IProduct) {
        this.items.push(product);
    };
    removeProduct(id: string) {
        this.items = this.items.filter((item) => item.id !== id);
    };
    clearBasket() {
        this.items = [];
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
