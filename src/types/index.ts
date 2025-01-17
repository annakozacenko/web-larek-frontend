import './scss/styles.scss';


export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number|null;
}


export interface IOrder {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}


export type PaymentMethod = 'online' | 'offline'


export type TProductBaseInfo = Pick<IProduct, 'title' | 'price' | 'category' | 'image'>;
export type TProductInfo = Pick<IProduct, 'title' | 'price' | 'category' | 'description' | 'image'>;
export type TProductBasketInfo = Pick<IProduct, 'title' | 'price'>;


export type TIOrderPaymentAndaddress = Pick<IOrder, 'payment' | 'address'>;
export type TIOrderEmailAndPhone = Pick<IOrder, 'email' | 'phone'>;


export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}



export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T>(url: string): Promise<T>;
    post<T>(orl: string, data: object, method?: ApiPostMethods): Promise<T>;
}





