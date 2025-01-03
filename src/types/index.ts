import './scss/styles.scss';


export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number
}


export interface IUser {
    payment: string;
    adress: string;
    email: string;
    phone: string;
}


type PaymentMethod = 'online' | 'offline'
type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'




interface IUserData {
    user: IUser;
    setUser(user: IUser): void;
    getUser(): IUser;
    setPaymentMethod(payment: string): void;
    getPaymentMethod(): string;
    setAdress(adress: string): void;
    getAdress(): string;
    setEmail(email: string): void;
    getEmail(): string;
    setTelephone(phone: string): void;
    getTelephone(): string;
}

export type TProductBaseInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'image'>;
export type TProductInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'description' | 'image'>;
export type TProductBasketInfo = Pick<IProduct,  'title' | 'price' >;


export type TIUserPaymentAndAdress = Pick<IUser,  'payment' | 'adress' >;
export type TIUserEmailAndPhone = Pick<IUser,  'email' | 'phone' >;







export interface IOrder {
    id: string;
    total: number;
}









//код и видео----------------------





interface IEventEmitter {
    emit(event: string, data: unknown): void;
}






interface IView {
    render(data?: object): HTMLElement; //устанавлваем данные, возвращаем элемент
}


