import { IEvents } from "../base/events";
import { IProduct, IOrder, PaymentMethod, TIOrderEmailAndPhone, TIOrderPaymentAndaddress } from "../../types";

export class OrderData {

    protected _payment: PaymentMethod;
    protected _address: string;
    protected _email: string;
    protected _phone: string;

    protected _total: number;
    protected _items: string[] = [];


    constructor(protected events: IEvents) {
        this.events = events;
    }



    set OrderItemsAndTotal(items: IProduct[]) {
        this._items = items.map((item) => item.id);
        this._total = items.reduce((acc, item) => acc + item.price, 0);
        this.events.emit('order-ItemsAndTotal:changed')
    }


    // get OrderItemsAndTotal(): [string[], number] {
    //     return [this._items, this._total];
    // }



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



    //проверить что требуется по валидации
    checkAddress(): boolean {
        return !!this._address;
    }
    checkPayment(): boolean {
        return !!this._payment
    }
    checkEmail(): boolean {
        return !!this._email
    }
    checkPhone(): boolean {
        return !!this._phone
    }


//как пользоваться?
    validateOrder(): boolean {
        const errors: Record<string, string> = {};
        if (!this.checkAddress()) errors.address = 'Адрес не указан';
        if (!this.checkPayment()) errors.payment = 'Способ оплаты не выбран';
        this.events.emit('order:errors', errors);
        return Object.keys(errors).length === 0;
      }

    isOrderReady(): boolean {
        return this.checkAddress() && this.checkPayment() && this.checkEmail() && this.checkPhone();
    }
}