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

**Данные товара**

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

**Тип данных, представляющий метод оплаты**
```
type PaymentMethod = 'online' | 'offline'
```


**Тип данных, представляющий категорию продукта**
```
type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
```


**Данные покупателя**

```
interface IUser {
    payment: PaymentMethod;
    adress: string;
    email: string;
    telephone: string;
}
```


**Данные товара, испольуемые в отображении на странице**

```
type TProductBaseInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'image'>;
```


**Данные товара, испольуемые в попапе товара**

```
type TProductInfo = Pick<IProduct,  'title' | 'price' | 'category' | 'description' | 'image'>;
```


**Данные товара, испольуемые в корзине**

```
type TProductBasketInfo = Pick<IProduct,  'title' | 'price' >;
```

**Данные пользователя, испольуемые при оформлении заказа**

```
type TIUserPaymentAndAdress = Pick<IUser,  'payment' | 'adress' >;
type TIUserEmailAndPhone = Pick<IUser,  'email' | 'phone' >;
```


**Интерфейс для модели данных товаров**

```
interface IProductData {
    items: IProduct[];
    preview: string|null;
    setItems(items: IProduct[]): void; //чтобы установить после загрузки из апи
    getProduct(id: string): IProduct;// чтобы получить при рендере списков
}
```


**Интерфейс для модели корзины**

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

Управляет данными товаров. Отвечает за их хранение и изменение.

Класс состоит из следующих полей и методов:

1.  items: IProduct[]: Список продуктов.
1.  setItems(items: IProduct[]): Устанавливает список продуктов.
2.  getProduct(id: string): IProduct: Возвращает продукт по ID.
3.  getItems(): IProduct[]: Возвращает все продукты.
 
#### Класс UserData

Работает с данными пользователя

*   setUserAddressAndPayment(TIUserPaymentAndAdress): void: Устанавливает данные пользователя о методе оплаты и адресе.
*   setUserEmailAndPhone(TIUserEmailAndPhone): void: Устанавливает данные пользователя о почте и телефоне.
*   getUser(): IUser: Возвращает данные пользователя.

#### Класс BasketModel

Управляет корзиной покупок

*   add(id: string): void: Добавляет товар.
*   remove(id: string): void: Удаляет товар.
*   getItems(): TProductBasketInfo[]: Возвращает список товаров в корзине.
