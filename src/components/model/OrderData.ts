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



    set orderItemsAndTotal(items: IProduct[]) {
        this._items = items.filter((item) => item.price > 0).map((item) => item.id);
        this._total = items.filter((item) => item.price > 0).reduce((acc, item) => acc + item.price, 0);
    }


    set userPaymentAndaddress(data: TIOrderPaymentAndaddress) {
        this._payment = data.payment as PaymentMethod;
        this._address = data.address;
    }


    get userPaymentAndaddress(): TIOrderPaymentAndaddress {
        return {
            payment: this._payment,
            address: this._address,
        };
    }

    set userEmailAndPhone(data: TIOrderEmailAndPhone) {
        this._email = data.email;
        this._phone = data.phone;
    }

    get userEmailAndPhone(): TIOrderEmailAndPhone {
        return {
            email: this._email,
            phone: this._phone,
        };
    }



    get orderInfo(): IOrder {
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