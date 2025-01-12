import { IEvents } from "../base/events";
import { IProduct, IOrder, PaymentMethod, TIOrderEmailAndPhone, TIOrderPaymentAndaddress } from "../../types";

export class OrderData {

    protected _payment: PaymentMethod;
    protected _address: string;
    protected _email: string;
    protected _phone: string;

    protected _total: number = 0;
    protected _items: string[] = [];


    constructor(protected events: IEvents) {
        this.events = events;
    }



    set OrderItemsAndTotal(items: IProduct[]) {
        this._items = items.filter((item) => item.price > 0).map((item) => item.id);
        this._total = items.filter((item) => item.price > 0).reduce((acc, item) => acc + item.price, 0);
        this.events.emit('order-ItemsAndTotal:changed')
    }


    set UserPaymentAndaddress(data: TIOrderPaymentAndaddress) {
        this._payment = data.payment as PaymentMethod;
        this._address = data.address;
        this.events.emit('order-PaymentAndaddress:changed')
    }


    get UserPaymentAndaddress(): TIOrderPaymentAndaddress {
        return {
            payment: this._payment,
            address: this._address,
        };
    }

    set UserEmailAndPhone(data: TIOrderEmailAndPhone) {
        this._email = data.email;
        this._phone = data.phone;
        this.events.emit('order-EmailAndPhone:changed')
    }

    get UserEmailAndPhone(): TIOrderEmailAndPhone {
        return {
            email: this._email,
            phone: this._phone,
        };
    }



    get OrderInfo(): IOrder {
        return {
            items: this._items,
            payment: this._payment,
            phone: this._phone,
            email: this._email,
            address: this._address,
            total: this._total,
        };
    }



}