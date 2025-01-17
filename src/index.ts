import { ProductData } from './components/model/ProductData';
import './scss/styles.scss';
import { OrderData } from './components/model/OrderData';
import { BasketData } from './components/model/BasketData';
import { OrderDataApi, ProductDataApi } from './components/DataApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { CardCatalogUI } from './components/view/CardCatalogUI';
import { Modal } from './components/view/Modal';
import { BasketUI } from './components/view/BasketUI';
import { CardPreviewUI } from './components/view/CardPreviewUI';
import { IProduct, TIOrderEmailAndPhone, TIOrderPaymentAndaddress } from './types';
import { CardBasketUI } from './components/view/CardBasketUI';
import { OrderFormUI } from './components/view/OrderFormUI';
import { ContactsFormUI } from './components/view/ContactsFormUI';
import { SuccessUI } from './components/view/SuccessUI';

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



const productListApi = new ProductDataApi(API_URL, {}, CDN_URL);
const orderApi = new OrderDataApi(API_URL);


//Получение списка товаров и помещение их в модель
productListApi.getProductListData()
    .then((data) => {
        if (data) {
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
        const card = new CardCatalogUI(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('ui:cardCatalog:clicked', item)
        });
        return card.render({ ...item });
    })
    page.catalog = elements;
});



//Изменения в модели корзины - Изменение компонентов корзины и счетчика
events.on('model:basket:changed', () => {
    page.counter = basketData.amount;

    const cardsInBasket = basketData.items.map((item, index) => {
        const cardInBasket = new CardBasketUI(cloneTemplate(cardBasketTemplate), events, {
            onClick: () => events.emit('ui:cardDeleteButton:clicked', item)
        });
        cardInBasket.index = index + 1;
        return cardInBasket.render({ ...item })
    });

    basketComponent.items = cardsInBasket;
    basketComponent.total = basketData.total;

    basketComponent.toggleButton(basketData.total !== 0);
});




//Выбор товара в каталоге
events.on('ui:cardCatalog:clicked', (item: IProduct) => {
    productData.selected = item;
    const isInBasket = basketData.isProductInBasket(item);
    cardPreview.toggleStatus(isInBasket);
    modal.content = cardPreview.render({ ...item });
    modal.render();
});


//Нажатие на кнопку добавления в корзину - добавление или удаление из корзины
events.on('ui:cardPreviewButton:clicked', () => {
    if (basketData.isProductInBasket(productData.selected)) {
        basketData.removeProduct(productData.selected.id);
        cardPreview.toggleStatus(false);
    } else {
        basketData.addProduct(productData.selected);
        cardPreview.toggleStatus(true);
    }
});



//Открытие корзины
events.on('ui:basket:opened', () => {
    modal.content = basketComponent.render();
    modal.render();
});

//Удаление товара из корзины
events.on('ui:cardDeleteButton:clicked', (element: IProduct) => {
    basketData.removeProduct(element.id);
});


//Подтверждение корзины
events.on('ui:basket:confirmed', () => {
    orderData.orderItemsAndTotal = basketData.items;
    modal.content = orderForm.render();

});




//-----------

// Обновляем отображение ошибок при вводе данных в форму заказа
events.on("ui:orderForm:update", (data: TIOrderPaymentAndaddress) => {
    orderData.userPaymentAndaddress = data;
});

// Проверка валидности полей при изменении данных пользователя
events.on('model:orderData:orderForm:update', () => {
    orderData.validateUserPaymentAndAddress();
});

// Обновляем отображение ошибок при вводе данных в форму
events.on("model:orderData:orderForm:validationErrors", (validationStatus: { errors: string, status: boolean }) => {
    orderForm.errors = validationStatus.errors;
    orderForm.valid = validationStatus.status;
}
)

//Отправка заказа после заполнение формы заказа
events.on('ui:orderForm:submit', () => {
    modal.content = contactsForm.render();
});

//-----------

// Обновляем отображение ошибок при вводе данных в форму контактов
events.on("ui:contactsForm:update", (data: TIOrderEmailAndPhone) => {
    orderData.userEmailAndPhone = data;
});

// Проверка валидности полей при изменении данных пользователя
events.on('model:orderData:contactsForm:update', () => {
    orderData.validateUserEmailAndPhone();
});

// Обновляем отображение ошибок при вводе данных в форму
events.on("model:orderData:contactsForm:validationErrors", (validationStatus: { errors: string, status: boolean }) => {
    contactsForm.errors = validationStatus.errors;
    contactsForm.valid = validationStatus.status;
}
)

//Отправка заказа после заполнение формы контактов
events.on('ui:contactsForm:submit', () => {

    orderApi.setOrder(orderData.orderInfo)
        .then((data) => {
            modal.content = successComponent.render({ value: data.total });
            basketData.clearBasket();
        })
        .catch((err) => {
            console.error('Ошибка: ', err);
        });
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

