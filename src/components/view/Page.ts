import { Component } from "./Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Page extends Component {
    protected _basketButton: HTMLButtonElement;
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);


        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container)
        this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.container)
        this._catalog = ensureElement<HTMLElement>('.gallery', this.container)
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container)


        this._basketButton.addEventListener('click', () => {
            this.events.emit('ui:basket:opened')
        })

    }



    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }



    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }


}