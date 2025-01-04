import { ProductData } from './components/model/ProductData';
import './scss/styles.scss';
import { UserData } from './components/UserData';
import { BasketData } from './components/model/BasketData';
import { ProductDataApi } from './components/ProductDataApi';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';

const events = new EventEmitter();
const productData = new ProductData();
const userData = new UserData();
const basketData = new BasketData();

productData.setList([
    {
        id: '1', title: 'Product 1',
        description: '',
        image: '',
        category: '',
        price: 0
    },
    {
        id: '2', title: 'Product 2',
        description: '',
        image: '',
        category: '',
        price: 0
    }
]);



const productListApi = new ProductDataApi(API_URL);
productListApi.getProductListData()
    .then((data) => {
        if (data) {
            console.log(data);
        } else {
            console.error('No data was received');
        }
    })
    .catch();
        {}
    ;


events.on('basket:changed', () => {