import { ProductData } from './components/model/ProductData';
import './scss/styles.scss';
import { OrderData } from './components/model/OrderData';
import { BasketData } from './components/model/BasketData';
import { OrderDataApi, ProductDataApi } from './components/ProductDataApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { CardCatalogUI } from './components/view/CardCatalogUI';
import { Modal } from './components/view/Modal';
import { BasketUI } from './components/view/BasketUI';
import { CardPreviewUI } from './components/view/CardPreviewUI';
import { IProduct } from './types';
import { Api } from './components/base/api';

const events = new EventEmitter();


// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


//Модели данных
const productData = new ProductData(events);
const orderData = new OrderData(events);
const basketData = new BasketData(events);

// Глобальные контейнеры
const page = new Page(ensureElement('.page'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


//Переиспользуемые части интерфейса
//const basketComponent = new BasketUI(cloneTemplate(templates.basketTemplate), events)
//const cardPreview = new CardPreviewUI(cloneTemplate(templates.cardPreviewTemplate), events);
//const orderForm = new OrderForm(cloneTemplate(templates.orderTemplate), events);
//const contactsForm = new ContactsForm(cloneTemplate(templates.contactsTemplate), events)
//const success = new Success(cloneTemplate(templates.successTemplate), events)


//Получение списка товаров
const productListApi = new ProductDataApi(API_URL, {}, CDN_URL);
const orderApi = new OrderDataApi(API_URL);


productListApi.getProductListData()
    .then((data) => {
        if (data) {
            console.log('Получен список продуктов: ', data.items);
            productData.items = data.items;


        } else {
            console.error('Данные не получены');
        }
    })
    .catch((err) => {
        console.error('Ошибка: ', err);
    });


//Рендер каталога товаров
events.on(`model:products:loaded`, () => {
    const elements = productData.items.map(item => {
        const card = new CardCatalogUI(cloneTemplate(cardCatalogTemplate), events);
        return card.render(item);
    })

    page.catalog = elements;
    // page.render();

});



//Выбор товара в каталоге
events.on(`cardCatalog:clicked`, (item: IProduct) => {
    productData.selected = item;
    console.log('Выбран товар: ', item);
});



//Изменен открытый выбранный лот
events.on('model:product:selected', (item: IProduct) => {
    const card = new CardPreviewUI(cloneTemplate(cardPreviewTemplate), events);
    modal.content = card.render(item);
    modal.render()
});





// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

