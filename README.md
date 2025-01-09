# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Данные и типы данных, используемые в приложении

**Данные товара**   +

```
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number
}
```

**Тип данных, представляющий метод оплаты**  +
```
type PaymentMethod = 'online' | 'offline'
```


**Тип данных, представляющий категорию продукта**   +
```
type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
```





**Данные товара, испольуемые в отображении на странице**  ?

```
type TProductBaseInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'image'>;
```

**Данные товара, испольуемые в попапе товара**    ?

```
type TProductInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'description' | 'image'>;
```

**Данные товара, испольуемые в корзине**   ?

```
type TProductBasketInfo = Pick<IProduct,  'title' | 'price' >;
```

**Данные покупателя**   +

```
interface IOrder {
    payment: PaymentMethod;
    address: string;
    email: string;
    telephone: string;
}
```


**Данные пользователя, испольуемые при оформлении заказа**   +

```
type TIOrderPaymentAndaddress = Pick<IOrder,  'payment' | 'address' >;
type TIOrderEmailAndPhone = Pick<IOrder,  'email' | 'phone' >;
```


**Интерфейс для модели данных товаров**   ? DUMAJU NE NUZHEN

```
interface IProductData {
    items: IProduct[];
    preview: string|null;
    setItems(items: IProduct[]): void; //чтобы установить после загрузки из апи
    getProduct(id: string): IProduct;// чтобы получить при рендере списков
}
```


**Интерфейс для модели корзины**   ? DUMAJU NE NUZHEN

```
interface IBasketModel {
    items: Map<string, number>;
    total: number;
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
    getItems(): TProductBasketInfo[];
}
```





## Архитектура приложения


### Слой данных

#### Класс ProductData   

Класс управляет данными товаров. Отвечает за их хранение и изменение.

Класс состоит из следующих полей и методов:

1. `items: IProduct[]`: Список товаров, по умолчанию пустой.
2. `constructor(events: IEvents)`: Конструктор принимает инстанс `IEvents` для создания событий.
3. `setList(items: IProduct[]): void`: Устанавливает список товаров.
4. `getList(): IProduct[]`: Возвращает все товары.
5. `getProduct(id: string): IProduct`: Возвращает товар по ID.


#### Класс OrderData

Класс управляет данными пользователя. Отвечает за их хранение и изменение.

Класс состоит из следующих полей и методов:

1. `payment: string`: Метод оплаты.
2. `address: string`: Адрес.
3. `email: string`: Почта.
4. `phone: string`: Телефон.
5. `setUserPaymentAndaddress(data: TIOrderPaymentAndaddress): void`: Устанавливает данные пользователя о методе оплаты и адресе.
6. `setUserEmailAndPhone(data: TIOrderEmailAndPhone): void`: Устанавливает данные пользователя о почте и телефоне.
7. `getUserInfo(): IOrder`: Возвращает данные пользователя.
8. `constructor(events: IEvents)`: Конструктор принимает инстанс `IEvents` для создания событий.




#### Класс BasketData

Класс для работы с корзиной покупок.

Класс состоит из следующих полей и методов:
*   `items: IProduct[]`: Список товаров, по умолчанию пустой.
*   `total: number`: Сумма товаров, по умолчанию 0.
*   `amount: number`: Количество товаров, по умолчанию 0.
*   `constructor(events: IEvents)`: Конструктор принимает инстанс `IEvents` для создания событий.
*   `addProduct(product: IProduct)`: Добавляет товар. Вызывает событие 'model:basket:changed'.
*   `removeProduct(id: string)`: Удаляет товар. Вызывает событие 'model:basket:changed'.
*   `clearBasket()`: Очищает корзину. Вызывает событие 'model:basket:changed'.
*   `getItems(): IProduct[]`: Возвращает список товаров.
*   `getTotal(): number`: Возвращает сумму товаров.
*   `getAmount(): number`: Возвращает количество товаров.



### Слой отображения

#### Класс Component 

Класс для наследования другими классами. Содержит в себе базовую логику отображения - методы, которые могут быть использованы в дочерних классах.

Класс состоит из следующих полей и методов:

*   `container: HTMLElement`: Контейнер для отображения.
*   `toggleClass(element: HTMLElement, className: string, force?: boolean)`: Переключает класс элемента.
*   `setText(element: HTMLElement, value: unknown)`: Устанавливает текстовое содержимое элемента.
*   `setDisabled(element: HTMLElement, state: boolean)`: Устанавливает атрибут `disabled` для элемента.
*   `setImage(element: HTMLImageElement, src: string, alt?: string)`: Устанавливает изображение для элемента.
*   `render(data?: Partial<T>): HTMLElement`: Отрисовывает экземпляр класса.

#### Класс ModalUI 

Отвечает за отображение формы заказа.
	•	paymentMethod: HTMLElement: Поле выбора способа оплаты.
	•	addressField: HTMLInputElement: Поле ввода адреса.
	•	confirmButton: HTMLButtonElement: Кнопка подтверждения.
	•	validateForm(): Проверяет заполненность полей.

#### Класс FormUI 

Отвечает за отображение формы заказа.
	•	paymentMethod: HTMLElement: Поле выбора способа оплаты.
	•	addressField: HTMLInputElement: Поле ввода адреса.
	•	confirmButton: HTMLButtonElement: Кнопка подтверждения.
	•	validateForm(): Проверяет заполненность полей.

#### Класс Page  

Класс для отображения страницы. Создается на основе класса `Component`. Содержит элемент для отображения карточек товаров и кнопки корзины с счетчиком.

Класс состоит из следующих полей и методов:

*   `basketButton: HTMLButtonElement`: Кнопка для перехода к корзине.
*   `basketCount: HTMLElement`: Элемент для отображения счетчика товаров в корзине.
*   `basketCountValue(value: number)`: Сеттер для установки значения счетчика товаров в корзине.

#### Класс CardCatalogUI  

Класс для отображения карточки товара в каталоге. Создается на основе класса `Component`. Содержит элементы для отображения информации о товаре.

Класс состоит из следующих полей и методов:

* `cardTitle: HTMLElement`: Элемент для отображения заголовка товара.
* `cardImage: HTMLImageElement`: Элемент для отображения изображения товара.
* `cardCategory: HTMLElement`: Элемент для отображения категории товара.
* `cardPrice: HTMLElement`: Элемент для отображения цены товара.
* `constructor(container: HTMLElement)`: Конструктор класса. Принимает HTML-элемент контейнера и инициализирует базовые элементы карточки товара.

#### Класс CardBasketUI   

Класс для отображения карточки товара в каталоге. Создается на основе класса `Component`. Содержит элементы для отображения информации о товаре.

Класс состоит из следующих полей и методов:

* `cardTitle: HTMLElement`: Элемент для отображения заголовка товара.
* `cardImage: HTMLImageElement`: Элемент для отображения изображения товара.
* `cardCategory: HTMLElement`: Элемент для отображения категории товара.
* `cardPrice: HTMLElement`: Элемент для отображения цены товара.
* `constructor(container: HTMLElement)`: Конструктор класса. Принимает HTML-элемент контейнера и инициализирует базовые элементы карточки товара.


#### Класс CardPreviewUI  

Класс для отображения карточки в превью каталога. Создается на основе класса `Component`. Содержит элементы для отображения информации о товаре.

Класс состоит из следующих полей и методов:

*   `cardTitle: HTMLElement`: Элемент для отображения заголовка товара.
*   `cardImage: HTMLImageElement`: Элемент для отображения изображения товара.
*   `cardCategory: HTMLElement`: Элемент для отображения категории товара.
*   `cardPrice: HTMLElement`: Элемент для отображения цены товара.
*   `cardButton: HTMLButtonElement`: Элемент для отображения кнопки "Добавить / Убрать".
*   `cardDescription: HTMLElement`: Элемент для отображения описания товара.
*   `constructor(container: HTMLElement, protected eventa: EventEmitter)`: Конструктор принимает инстанс `IEvents` для создания событий.
*   `toggleStatus(value: boolean)`: Метод для переключения текста кнопки. Принимает булево значение, при `true` - 'Убрать из корзины', при `false` - 'Добавить'.
*   `render(data: Partial<IProduct>): HTMLElement`: Отрисовывает экземпляр класса, принимает объект товара.


Шапка сайта (Header)
	•	Логотип: .header__logo
	•	Корзина: .header__basket

Галерея товаров
	•	Контейнер для карточек: .gallery

Модальные окна
	•	Контейнер модального окна: .modal
	•	Примеры модального контента:
	•	Просмотр карточки товара: .card_full
	•	Корзина: .basket
	•	Форма заказа: .form

Шаблоны (Templates)
	•	Каталог карточек: #card-catalog
	•	Предпросмотр товара: #card-preview
	•	Карточка корзины: #card-basket
	•	Корзина: #basket
	•	Заказ: #order
	•	Контактные данные: #contacts
	•	Успешное оформление заказа: #success



#### Класс BasketUI   

Управляет корзиной, наследует Component.
	•	items: HTMLElement[]: Список товаров.
	•	totalPrice: HTMLElement: Общая сумма.
	•	addItem(item: HTMLElement): Добавляет товар.
	•	removeItem(index: number): Удаляет товар.
	•	updateTotal(price: number): Обновляет сумму.


#### Класс PaymentAndAddressFormUI  

Отвечает за отображение формы заказа.
	•	paymentMethod: HTMLElement: Поле выбора способа оплаты.
	•	addressField: HTMLInputElement: Поле ввода адреса.
	•	confirmButton: HTMLButtonElement: Кнопка подтверждения.
	•	validateForm(): Проверяет заполненность полей.


#### Класс EmailAndPhoneFormUI   

Отвечает за отображение формы заказа.
	•	paymentMethod: HTMLElement: Поле выбора способа оплаты.
	•	addressField: HTMLInputElement: Поле ввода адреса.
	•	confirmButton: HTMLButtonElement: Кнопка подтверждения.
	•	validateForm(): Проверяет заполненность полей.

#### Класс SuccessModalUI 

Отвечает за отображение формы заказа.
	•	paymentMethod: HTMLElement: Поле выбора способа оплаты.
	•	addressField: HTMLInputElement: Поле ввода адреса.
	•	confirmButton: HTMLButtonElement: Кнопка подтверждения.
	•	validateForm(): Проверяет заполненность полей.


### Слой презентера

В данном проекте не выделен отдельный класс презентера. Весь функционал презентора реализован в файле `index.ts`, с помощью брокера событий и обработчиков событий.

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
 
- `user:changed` - изменение данных пользователя
- `cards:changed` - изменение массива карточек
- `card:selected` - изменение открываемой в модальном окне картинки карточки
- `card:previewClear` - необходима очистка данных выбранной для показа в модальном окне карточки

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `userEdit:open` - открытие модального окна с формой редактирования данных пользователя
- `newCard:open` - открытие модального окна создания новой карточки
- `avatar:open` - открытие модального окна с формой редактирования аватара пользователя
- `card:select` - выбор карточки для отображения в модальном окне
- `card:delete` - выбор карточки для удаления
- `card:like` - изменение состояния лайка на карточке
- `edit-profile:input` - изменение данных в форме с данными пользователя
- `edit-avatar:input` - изменение данных в форме с аватаром пользователя
- `new-place:input` - изменение данных в форме создания новой карточки
- `edit-profile:submit` - сохранение данных пользователя в модальном окне
- `edit-avatar:submit` - сохранение аватара пользователя в модальном окне
- `new-place:submit` - событие, генерируемое при создании новой карточки в форме
- `remove-card:submit` - событие, генерируемое при нажатии "Да" в форме подтверждения
- `edit-profile:validation` - событие, сообщающее о необходимости валидации формы профиля
- `edit-avatar:validation` - событие, сообщающее о необходимости валидации формы аватара пользователя
- `new-place:validation` - событие, сообщающее о необходимости валидации формы создания новой карточки
