import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormUI } from "./FormUI";

export class OrderFormUI extends FormUI {
    protected _paymentButtonCard: HTMLButtonElement;
    protected _paymentButtonCash: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;
    protected _paymentType: string = '';
    protected _submitButton: HTMLButtonElement;
    protected _errorField: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._errorField = ensureElement<HTMLElement>('.form__errors', this.container);
        this._paymentButtonCard = ensureElement<HTMLButtonElement>('[name="card"]', this.container);
        this._paymentButtonCash = ensureElement<HTMLButtonElement>('[name="cash"]', this.container);
        this._addressInput = ensureElement<HTMLInputElement>('.order__field input', this.container);
        this._submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container);


        this._paymentButtonCard.addEventListener('click', (evt) =>
            this.onPaymentButtonClick(evt, 'online', this._paymentButtonCard, this._paymentButtonCash)
        );
        this._paymentButtonCash.addEventListener('click', (evt) =>
            this.onPaymentButtonClick(evt, 'offline', this._paymentButtonCash, this._paymentButtonCard)
        );

        this._addressInput.addEventListener('input', () =>
            this.checkAddressValidity()
        );

        this._submitButton.addEventListener('click', this.onSubmit);

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
            this.hideInputError(this._addressInput);
        } else {
            this.showInputError(this._addressInput, 'Введите адрес доставки.');
        }

        this.events.emit('ui:orderForm:inputChange', {
            address: this._addressInput.value.trim(),
            paymentType: this._paymentType,
        });
        this.updateSubmitButtonState();
    }


    protected checkPaymentValidity() {
        const isPaymentValid = this._paymentType !== '';

        if (isPaymentValid) {
            this.hidePaymentError();
        } else {
            this.showPaymentError('Выберите способ оплаты.');
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


    protected showInputError(input: HTMLInputElement, errorMessage: string) {
        this._errorField.textContent = errorMessage;
        input.classList.add('input-error');
    }


    protected hideInputError(input: HTMLInputElement) {
        this._errorField.textContent = '';
        input.classList.remove('input-error');
    }


    protected showPaymentError(errorMessage: string) {
        this._errorField.textContent = errorMessage;

    }


    protected hidePaymentError() {
        this._errorField.textContent = '';

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
        this._submitButton.disabled = !isFormValid;
    }


    reset(): void {
        this._paymentType = '';
        this._addressInput.value = '';
        this._errorField.textContent = '';
        this._paymentButtonCard.classList.remove('button_alt-active', 'button-error');
        this._paymentButtonCash.classList.remove('button_alt-active', 'button-error');
        this._addressInput.classList.remove('input-error');
        this.updateSubmitButtonState();
    }
}