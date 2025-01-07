import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class ProductData {
    protected _items: IProduct[] = [];
    protected events: IEvents;
    protected _selected: IProduct | null ;

    constructor(events: IEvents) {
        this.events = events;
    }
    

    set items(items: IProduct[]) {
        this._items = items
        this.events.emit('model:products:loaded')
    }; //чтобы добавить в массив после загрузки из апи

    get items(): IProduct[] {
        return this._items
    }

    getItem(id: string|null){
        return this._items.find((item) => item.id === id)
    }

    set selected(item:IProduct|null) {
        if (!item) {
            this._selected = null;

        }
        else  {
            this._selected = item;
            this.events.emit('model:product:selected', item)
        }
    }

    get selected(){
        return this._selected
    }
 
}

