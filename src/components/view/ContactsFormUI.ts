import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormUI } from "./FormUI";

export class ContactsFormUI extends FormUI {
    protected _emailInput: HTMLInputElement;
    protected _phoneInput: HTMLInputElement;
    protected _submitButton: HTMLButtonElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._emailInput = ensureElement<HTMLInputElement>('[name="email"]', this.container);
        this._phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', this.container);
        this._submitButton = ensureElement<HTMLButtonElement>('.modal__actions .button', this.container);

        this._emailInput.addEventListener('input', this.onInput);
        this._phoneInput.addEventListener('input', this.onInput);
        this._submitButton.addEventListener('click', this.onSubmit);

        this.updateSubmitButtonState();
    }

    private onInput = (): void => {
        this.errors = this.getValidationErrorMessage();
        this.updateSubmitButtonState();
    };


    private getValidationErrorMessage(): string {
        if (!this.isInputValid(this._emailInput)) {
            return 'Поле email не может быть пустым.';
        }

        if (!this.isInputValid(this._phoneInput)) {
            return 'Поле телефона не может быть пустым.';
        }
        return '';
    }


    private isInputValid(input: HTMLInputElement): boolean {
        return input.value.trim() !== '';
    }

    private updateSubmitButtonState(): void {
        const FormValidationStatus = this.isInputValid(this._emailInput) && this.isInputValid(this._phoneInput);
        this.valid = FormValidationStatus;
    }

    protected onSubmit = (evt: Event): void => {
        evt.preventDefault();
        this.events.emit('ui:contactsForm:submit', {
            email: this._emailInput.value.trim(),
            phone: this._phoneInput.value.trim(),
        });
    };

}