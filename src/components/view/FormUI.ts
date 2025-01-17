import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class FormUI extends Component {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;


    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this._submitButton = ensureElement<HTMLButtonElement>('.modal__actions .button', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);


    }

    toggleButton(state: boolean) {
        this.setDisabled(this._submitButton, !state);

    }

    set valid(value: boolean) {
        this._submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }
}