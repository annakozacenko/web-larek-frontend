import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class SuccessUI extends Component {
	protected _sucessButton: HTMLButtonElement;
	protected _description: HTMLSpanElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this._description = ensureElement<HTMLSpanElement>('.order-success__description', this.container)
		this._sucessButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
		this._sucessButton.addEventListener('click', () => {
			events.emit('ui:sucсessButton:pressed');
		})
	}

	render(data: { value: number }) {
		this._description.textContent = `Списано ${String(data.value)} синапсов`;
		return super.render();
	}
}