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

        this._emailInput.required = true;
        this._phoneInput.required = true;

        this._emailInput.addEventListener('input', this.onInputChange);
        this._phoneInput.addEventListener('input', this.onInputChange);
        this._submitButton.addEventListener('click', this.onSubmit);

        this.updateSubmitButtonState();
    }

    /**
     * Обработчик изменения полей ввода.
     */
    protected onInputChange = () => {
        this.events.emit('ui:contactsForm:inputChange', {
            email: this._emailInput.value.trim(),
            phone: this._phoneInput.value.trim()
        });
        this.updateSubmitButtonState();
    }

    /**
     * Обработчик отправки формы.
     */
    protected onSubmit = (evt: Event) => {
        evt.preventDefault();
        if (this.validate()) {
            this.events.emit('ui:contactsForm:submit', {
                email: this._emailInput.value.trim(),
                phone: this._phoneInput.value.trim()
            });
        } else {
            console.warn('Форма не прошла валидацию');
        }
    }

    /**
     * Валидация формы.
     */
    validate(): boolean {
        const errors: string[] = [];
        const email = this._emailInput.value.trim();
        const phone = this._phoneInput.value.trim();

        const isEmailValid = email !== '';
        const isPhoneValid = phone !== '';

        if (!isEmailValid) {
            errors.push('Поле email не может быть пустым.');
        }

        if (!isPhoneValid) {
            errors.push('Поле телефона не может быть пустым.');
        }

        if (!isEmailValid && !isPhoneValid) {
            errors.push('Поля email и телефона не могут быть пустыми.');
        }
        

        this.setValidationErrors(errors.join(' '));

        return isEmailValid && isPhoneValid;
    }

    /**
     * Установка сообщений об ошибках.
     */
    setValidationErrors(error: string) {
        this._errorField.textContent = error;

        if (error.includes('email')) {
            this._emailInput.classList.add('input-error');
        } else {
            this._emailInput.classList.remove('input-error');
        }

        if (error.includes('телефона')) {
            this._phoneInput.classList.add('input-error');
        } else {
            this._phoneInput.classList.remove('input-error');
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
        this._emailInput.value = '';
        this._phoneInput.value = '';
        this._errorField.textContent = '';
        this._emailInput.classList.remove('input-error');
        this._phoneInput.classList.remove('input-error');
        this.updateSubmitButtonState();
    }
}