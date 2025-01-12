import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormUI } from "./FormUI";

export class ContactsFormUI extends FormUI {
    protected _emailInput: HTMLInputElement;
    protected _phoneInput: HTMLInputElement;
    protected _submitButton: HTMLButtonElement;
    protected _errorField: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._errorField = ensureElement<HTMLElement>('.form__errors', this.container);
        this._emailInput = ensureElement<HTMLInputElement>('[name="email"]', this.container);
        this._phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', this.container);
        this._submitButton = ensureElement<HTMLButtonElement>('.modal__actions .button', this.container);



        this._emailInput.addEventListener('input', () => this.checkInputValidity(this._emailInput));
        this._phoneInput.addEventListener('input', () => this.checkInputValidity(this._phoneInput));
        this._submitButton.addEventListener('click', this.onSubmit);



        this.updateSubmitButtonState();
    }


    private checkInputValidity(inputElement: HTMLInputElement): void {
        let errorMessage = '';


        if (inputElement.value.trim() == '') {
            if (inputElement.name === 'email' && inputElement.validity.valueMissing) {
                errorMessage = 'Поле email не может быть пустым.';
            } else if (inputElement.name === 'phone' && inputElement.validity.valueMissing) {
                errorMessage = 'Поле телефона не может быть пустым.';
            } else {
                errorMessage = inputElement.validationMessage;
            }
        }

        this.setFieldError(inputElement, errorMessage);
        this.updateSubmitButtonState();
    }


    private setFieldError(inputElement: HTMLInputElement, errorMessage: string): void {
        const errorField = this._errorField;
        errorField.textContent = errorMessage;

        if (errorMessage) {
            inputElement.classList.add('input-error');
        } else {
            inputElement.classList.remove('input-error');
        }
    }


    private updateSubmitButtonState(): void {
        const isFormValid = this._emailInput.validity.valid && this._phoneInput.validity.valid;
        this._submitButton.disabled = !isFormValid;
    }


    protected onSubmit = (evt: Event) => {
        evt.preventDefault();

        if (this._emailInput.validity.valid && this._phoneInput.validity.valid) {
            this.events.emit('ui:contactsForm:submit', {
                email: this._emailInput.value.trim(),
                phone: this._phoneInput.value.trim()
            });
        } else {
            console.warn('Форма содержит ошибки и не может быть отправлена.');
        }
    };


    reset(): void {
        this._emailInput.value = '';
        this._phoneInput.value = '';
        this.setFieldError(this._emailInput, '');
        this.setFieldError(this._phoneInput, '');
        this.updateSubmitButtonState();
    }
}