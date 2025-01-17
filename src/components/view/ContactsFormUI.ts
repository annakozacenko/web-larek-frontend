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

        this._emailInput.addEventListener('input', this.onInput);
        this._phoneInput.addEventListener('input', this.onInput);
        this._submitButton.addEventListener('click', this.onSubmit);

        this.valid = false;
    }

    private onInput = (): void => {
        this.events.emit('ui:contactsForm:update', {
            email: this._emailInput.value.trim(),
            phone: this._phoneInput.value.trim(),
        });
    };

    protected onSubmit = (evt: Event): void => {
        evt.preventDefault();
        this.events.emit('ui:contactsForm:submit');
    };

}