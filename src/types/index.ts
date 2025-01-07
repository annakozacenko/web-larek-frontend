import './scss/styles.scss';


export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number
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
type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'




interface IOrderData {
    user: IOrder;
    setUser(user: IOrder): void;
    getUser(): IOrder;
    setPaymentMethod(payment: string): void;
    getPaymentMethod(): string;
    setaddress(address: string): void;
    getaddress(): string;
    setEmail(email: string): void;
    getEmail(): string;
    setTelephone(phone: string): void;
    getTelephone(): string;
}

export type TProductBaseInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'image'>;
export type TProductInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'description' | 'image'>;
export type TProductBasketInfo = Pick<IProduct,  'title' | 'price' >;


export type TIOrderPaymentAndaddress = Pick<IOrder,  'payment' | 'address' >;
export type TIOrderEmailAndPhone = Pick<IOrder,  'email' | 'phone' >;



export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T>(url: string): Promise<T>;
  post<T>(orl: string, data: object, method?: ApiPostMethods): Promise<T>;
}







//код и видео----------------------





interface IEventEmitter {
    emit(event: string, data: unknown): void;
}






interface IView {
    render(data?: object): HTMLElement; //устанавлваем данные, возвращаем элемент
}


