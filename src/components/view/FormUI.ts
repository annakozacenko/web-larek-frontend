import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class FormUI extends Component {
    protected _button: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected _inputs: HTMLInputElement[];



    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this._button = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);


    }

    toggleButton(state: boolean) {
        this.setDisabled(this._button, !state);

    }

    set valid(value: boolean) {
        this._button.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }
}