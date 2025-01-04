import {  IUser, TIUserEmailAndPhone, TIUserPaymentAndAdress } from "../types";

export class UserData {

protected payment: string = '';
protected adress: string = '';
protected email: string = '';
protected phone: string = '';



    constructor() {}



setUserPaymentAndAdress(data: TIUserPaymentAndAdress): void {
 this.payment = data.payment;
 this.adress = data.adress;
}

setUserEmailAndPhone(data: TIUserEmailAndPhone): void {
    this.email = data.email;
    this.phone = data.phone;
}

getUserInfo(): IUser {
    return {   
        payment: this.payment,
        adress: this.adress,
        email: this.email,
        phone: this.phone
    };
}
}