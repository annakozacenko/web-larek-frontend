import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class ProductData {
    protected items: IProduct[] = [];
    constructor( protected events: IEvents) {}
    
    preview: string | null;
    setList(items: IProduct[]): void {
        this.items = items
    }; //чтобы добавить в массив после загрузки из апи

    getList(): IProduct[] {
        return this.items
    }

    getProduct(id: string): IProduct {
        return this.items.find((item) => item.id === id)
    }
 
checkProduct(id: string) {
    const item = this.getProduct(id);

}
}

