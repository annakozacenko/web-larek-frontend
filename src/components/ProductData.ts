import { IProduct } from "../types";

export class ProductData {
    protected items: IProduct[] = [];
    constructor() {}
    
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

