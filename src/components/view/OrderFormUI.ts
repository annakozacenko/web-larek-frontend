import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormUI } from "./FormUI";

export class OrderFormUI extends FormUI {
    protected _paymentButtonCard: HTMLButtonElement;
    protected _paymentButtonCash: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;
    protected _paymentType: string = '';



    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._paymentButtonCard = ensureElement<HTMLButtonElement>('[name="card"]', this.container);
        this._paymentButtonCash = ensureElement<HTMLButtonElement>('[name="cash"]', this.container);
        this._addressInput = ensureElement<HTMLInputElement>('.order__field input', this.container);
 

        this._paymentButtonCard.addEventListener('click', (evt) =>
            this.onPaymentButtonClick(evt, 'online', this._paymentButtonCard, this._paymentButtonCash)
        );
        this._paymentButtonCash.addEventListener('click', (evt) =>
            this.onPaymentButtonClick(evt, 'offline', this._paymentButtonCash, this._paymentButtonCard)
        );

        this._addressInput.addEventListener('input', () =>
            this.checkAddressValidity()
        );

        this._button.addEventListener('click', this.onSubmit);

        this.updateSubmitButtonState();
    }



    protected onPaymentButtonClick(evt: Event, paymentType: string, clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
        evt.preventDefault();

        this._paymentType = this._paymentType === paymentType ? '' : paymentType;

        this.switchButtons(clickedButton, otherButton);
        this.checkPaymentValidity();
        this.updateSubmitButtonState();
    }


    protected checkAddressValidity() {
        const isAddressValid = this._addressInput.value.trim() !== '';

        if (isAddressValid) {
            this.errors = '';
        } else {
            this.errors = 'Введите адрес доставки.';
        }
        this.updateSubmitButtonState();
    }


    protected checkPaymentValidity() {
        const isPaymentValid = this._paymentType !== '';

        if (isPaymentValid) {
            this.errors = '';
        } else {
            this.errors = 'Выберите способ оплаты.';
        }
    }


    protected onSubmit = (evt: Event) => {
        evt.preventDefault();
        if (this.validate()) {
            this.events.emit('ui:orderForm:submit', {
                address: this._addressInput.value.trim(),
                payment: this._paymentType,
            });
        } else {
            console.warn('Форма не прошла валидацию');
        }
    }


    validate(): boolean {
        const isAddressValid = this._addressInput.value.trim() !== '';
        const isPaymentTypeValid = this._paymentType !== '';

        return isAddressValid && isPaymentTypeValid;
    }



    protected switchButtons(activeButton: HTMLButtonElement, inactiveButton: HTMLButtonElement) {
        if (this._paymentType) {
            activeButton.classList.add('button_alt-active');
            inactiveButton.classList.remove('button_alt-active');
        } else {
            activeButton.classList.remove('button_alt-active');
        }
    }


    updateSubmitButtonState() {
        const isFormValid = this.validate();
        this.valid = isFormValid;
    }


}