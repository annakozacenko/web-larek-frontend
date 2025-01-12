import { IOrder, IProduct } from "../types";
import { Api } from "./base/api";

export class ProductDataApi extends Api {
    private readonly cdn: string;

    constructor(baseUrl: string, options: RequestInit = {}, cdn: string) {
        super(baseUrl, options);
        this.cdn = cdn; 
    }
    getProductListData(): Promise<{ total: number, items: IProduct[] }> {
        return this.get<{ total: number, items: IProduct[] }>('/product')
            .then((data) => ({
                ...data,
                items: data.items.map((item) => ({
                    ...item,
                    image: this.cdn + item.image 
                }))
            }));
    }



}


export class OrderDataApi extends Api {

    setOrder(data: IOrder): Promise<{id: string, total:number}> {
        return this.post<{id: string, total:number}>('/order', data);
    }

}


