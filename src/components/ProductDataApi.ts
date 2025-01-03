import { IOrder, IProduct } from "../types";
import { Api } from "./base/api";

export class ProductDataApi extends Api {
    getProductListData(): Promise<IProduct[]> {
        return this.get<IProduct[]>('/product');
    }

    getProductData(id: string): Promise<IProduct> {
        return this.get<IProduct>(`/product/${id}`);
    }

}


export class UserDataApi extends Api {

    setOrder(data: IOrder): Promise<IOrder> {
        return this.post<IOrder>('/order', data);
    }

}