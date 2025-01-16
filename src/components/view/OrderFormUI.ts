import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormUI } from "./FormUI";

export class OrderFormUI extends FormUI {
    protected _paymentButtonCard: HTMLButtonElement;
    protected _paymentButtonCash: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;
    protected _currentPaymentType: string | null = null;



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


        this._addressInput.addEventListener('input', this.onInput);

        this._button.addEventListener('click', this.onSubmit);

        this.valid = false;
    }



    private onInput = (): void => {
        this.events.emit('ui:orderForm:update', {
            payment: this._currentPaymentType,
            address: this._addressInput.value.trim()
        });
    }

    protected onPaymentButtonClick(evt: Event, paymentType: string, clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
        evt.preventDefault();

        this._currentPaymentType = this._currentPaymentType === paymentType ? null : paymentType;

        this.switchButtons(clickedButton, otherButton);
        this.events.emit('ui:orderForm:update', {
            payment: this._currentPaymentType,
            address: this._addressInput.value.trim()
        });

    }


    protected onSubmit = (evt: Event) => {
        evt.preventDefault();
        this.events.emit('ui:orderForm:submit');
    }


    protected switchButtons(activeButton: HTMLButtonElement, inactiveButton: HTMLButtonElement) {
        if (this._currentPaymentType) {
            activeButton.classList.add('button_alt-active');
            inactiveButton.classList.remove('button_alt-active');
        } else {
            activeButton.classList.remove('button_alt-active');
        }
    }


}