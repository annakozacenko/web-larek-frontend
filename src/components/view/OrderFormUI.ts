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



        this._paymentButtonCard.addEventListener('click', (evt) => this.onPaymentButtonClick(evt, 'online', this._paymentButtonCard, this._paymentButtonCash));
        this._paymentButtonCash.addEventListener('click', (evt) => this.onPaymentButtonClick(evt, 'offline', this._paymentButtonCash, this._paymentButtonCard));
        this._addressInput.addEventListener('input', this.onInputChange);
        this._submitButton.addEventListener('click', this.onSubmit);
       // this.validate();
    }


    protected onPaymentButtonClick(evt: Event, paymentType: string, clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
        evt.preventDefault();
        if (this._paymentType !== paymentType) {
            this._paymentType = paymentType;
            this.switchButtons(clickedButton, otherButton);
        } else {
            this._paymentType = '';
            clickedButton.classList.remove('button_alt-active');
        }
        this.onInputChange();
    }

    /**
     * Обработчик изменения полей ввода.
     */
    protected onInputChange = () => {
        this.events.emit('ui:orderForm:inputChange', {
            address: this._addressInput.value.trim(),
            paymentType: this._paymentType
        });
        this.updateSubmitButtonState();
    }

    /**
     * Обработчик отправки формы.
     */
    protected onSubmit = (evt: Event) => {
        evt.preventDefault();
        if (this.validate()) {
            this.events.emit('ui:orderForm:submit', {
                address: this._addressInput.value.trim(),
                payment: this._paymentType
            });
        } else {
            console.warn('Форма не прошла валидацию');
        }
    }

    /**
     * Переключение активных кнопок выбора способа оплаты.
     */
    protected switchButtons(activeButton: HTMLButtonElement, inactiveButton: HTMLButtonElement) {
        activeButton.classList.add('button_alt-active');
        inactiveButton.classList.remove('button_alt-active');
    }

    /**
     * Валидация формы.
     */
    validate(): boolean {
        this._addressInput.required = true;
        const errors: string[] = [];
        const isAddressValid = this._addressInput.value.trim() !== '';
        const isPaymentTypeValid = this._paymentType !== '';

        if (!isAddressValid && !isPaymentTypeValid) {
            this.setValidationErrors('Введите адрес доставки и выберите способ оплаты.');
        } else if (!isAddressValid) {
            this.setValidationErrors('Введите адрес доставки.');
        } else if (!isPaymentTypeValid) {
            this.setValidationErrors('Выберите способ оплаты.');
        }
        else {
            this.setValidationErrors('');
        }


  
        return isAddressValid && isPaymentTypeValid;
    }

    /**
     * Установка сообщений об ошибках.
     */
    setValidationErrors(error: string) {
        this._errorField.textContent = error;
        if (error.length === 0) {
            this._addressInput.classList.remove('input-error');
            this._paymentButtonCard.classList.remove('button-error');
            this._paymentButtonCash.classList.remove('button-error');
        } else {
            if (error.includes('Введите адрес доставки.')) {
                this._addressInput.classList.add('input-error');
            }
            if (error.includes('Выберите способ оплаты.')) {
                this._paymentButtonCard.classList.add('button-error');
                this._paymentButtonCash.classList.add('button-error');
            }
        }
    }

    /**
     * Обновление состояния кнопки отправки.
     */
    updateSubmitButtonState() {
        this._submitButton.disabled = !this.validate();
    }

    /**
     * Сброс состояния формы.
     */
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