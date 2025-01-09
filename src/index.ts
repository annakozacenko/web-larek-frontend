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
import { IProduct, TIOrderEmailAndPhone, TIOrderPaymentAndaddress } from './types';
import { Api } from './components/base/api';
import { Card } from './components/view/CardUI';
import { CardBasketUI } from './components/view/CardBasketUI';
import { OrderFormUI } from './components/view/OrderFormUI';
import { ContactsFormUI } from './components/view/ContactsFormUI';
import {  SuccessUI } from './components/view/SuccessUI';

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
const basketComponent = new BasketUI(cloneTemplate(basketTemplate), events)
const cardPreview = new CardPreviewUI(cloneTemplate(cardPreviewTemplate), events);
const orderForm = new OrderFormUI(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsFormUI(cloneTemplate(contactsTemplate), events)
const successComponent = new SuccessUI(cloneTemplate(successTemplate), events)


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



//Выбор товара в каталоге, сохранение в модели, рендер модалки карточки
events.on(`cardCatalog:clicked`, (item: IProduct) => {
    productData.selected = item;
    console.log('Выбран товар: ', item);
   // const card = new CardPreviewUI(cloneTemplate(cardPreviewTemplate), events);
    const isInBasket = basketData.isProductInBasket(item);
    cardPreview.toggleStatus(isInBasket);
    modal.content = cardPreview.render(item);
    modal.render()
});



//Изменен открытый выбранный лот-похоже не нужен
events.on('model:product:selected', (item: IProduct) => {

});




//Нажатие на кнопку добавления в корзину - добавление или удаление из корзины
events.on('cardPreviewButton:clicked', (element: CardPreviewUI) => {
    if (basketData.isProductInBasket(productData.selected)) {
        basketData.removeProduct(productData.selected.id);
        element.toggleStatus(false);
        console.log('Товар удален из корзины');
    } else {
        basketData.addProduct(productData.selected);
        element.toggleStatus(true);
        console.log('Товары в корзине ', basketData.Items);
    }
});




//Изменение счетчика в корзине и подготовка корзины к рендеру
events.on('model:basket:changed', () => {
    page.counter = basketData.Amount;
    basketComponent.render();
    console.log(basketComponent)
    page.render();

    const cardsInBasket = basketData.Items.map(item => {
        const cardInBasket = new CardBasketUI(cloneTemplate(cardBasketTemplate), events);
        return cardInBasket.render(item);
    })
    basketComponent.items = cardsInBasket;
    console.log('Товары хтмл в корзине ', basketComponent);

});




//Открытие корзины
events.on('basket:opened', () => {
    basketComponent.items;
    basketComponent.total = basketData.Total;
    modal.content = basketComponent.render();
    modal.render();
});

//Удаление товара из корзины
events.on('cardDeleteButton:clicked', (element: IProduct) => {
    basketData.removeProduct(element.id);
    basketComponent.total = basketData.Total;
    console.log('Товар удален из корзины');
    basketComponent.render();
});


//Подтверждение корзины
events.on('ui:basket:confirmed', () => {
    orderData.OrderItemsAndTotal = basketData.Items;

    modal.content = orderForm.render();
    modal.render();
});

//Отправка заказа после заполнение формы заказа
events.on('ui:orderForm:submit', (data:TIOrderPaymentAndaddress) => {
    console.log('Отправка заказа: ', data);
    orderData.UserPaymentAndaddress = data;

    modal.content = contactsForm.render();
    modal.render();
});

//Отправка заказа после заполнение формы контактов
events.on('ui:contactsForm:submit', (data:TIOrderEmailAndPhone) => {
    orderData.UserEmailAndPhone = data;
    console.log('Отправка заказа: ', orderData.OrderInfo);
orderApi.setOrder(orderData.OrderInfo)
.then((data) => {
    modal.content = successComponent.render({ value: data.total });
    console.log('Заказ отправлен: ', data);
    events.emit('шш');
})
    .catch((err) => {
        console.error('Ошибка: ', err);
    });

    modal.render();
});



//Оформление заказа
events.on('шш', () => {
  //  modal.close();
    basketData.clearBasket();
    basketComponent.total = basketData.Total;
    console.log('Корзина очищена');
    basketComponent.render();
    page.render();
});


events.on('ui:sucсessButton:pressed', () => {
    modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

