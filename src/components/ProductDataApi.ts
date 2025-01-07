import { IOrder, IProduct } from "../types";
import { Api } from "./base/api";

export class ProductDataApi extends Api {
    private readonly cdn: string;

    constructor(baseUrl: string, options: RequestInit = {}, cdn: string) {
        super(baseUrl, options);
        this.cdn = cdn; // Устанавливаем ссылку CDN
    }
    getProductListData(): Promise<{ total: number, items: IProduct[] }> {
        return this.get<{ total: number, items: IProduct[] }>('/product')
            .then((data) => ({
                ...data,
                items: data.items.map((item) => ({
                    ...item,
                    image: this.cdn + item.image // Добавляем ссылку CDN перед изображением
                }))
            }));
    }



}


export class OrderDataApi extends Api {

    setOrder(data: IOrder): Promise<IOrder> {
        return this.post<IOrder>('/order', data);
    }

}


