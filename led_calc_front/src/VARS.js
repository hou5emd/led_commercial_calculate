import ApolloClient from 'apollo-boost';
import { parseJSON } from './comp/resptests';
import SelTapeProd from "./comp/tapeproduktion";

//Запрос курса долара
async function usdrub(){
    try{
        let requestList = await fetch("https://free.currconv.com/api/v7/convert?q=USD_rub&compact=ultra&apiKey=d627ca26905beb62f82a",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {

                return response.json();
            })
            .then((data) =>{
                console.log(data.USD_RUB);
                VARS.usdrub = data.USD_RUB;
            });


    } catch {
        alert('Проблема с загрузкой курса Доллара');
    }

}
usdrub();

const VARS = {
    URL: "http://localhost:1337/",
    client: '',
    usdrub:null, //Курс доллара
    typeOfProductID: '', //Тип продукции
    module: {}, //Обьект с параметрами модуля
    cabinet:{}, //Обьект с параметрами кабинета
    cabinetSumm:null, //Сумма кабинетов
    shablon: null, //обьект с параметрами шаблона
    screenSizeInputWidth: null, //Введенная ширина
    screenSizeInputHeight: null, //Введенная высота
    screenSizeWidth:null, //Расчетная ширана
    screenSizeHeight:null, //Расчетная высота
    screenCabinetWidth:null, //Кол. кабинетов по ширине
    screenCabinetHeigth:null, //Кол. кабинетов по высоте
    priceInWork:null, //Цена в закупе
    priceUP:null, //Процент наценки
    priceOut:null, //Прайс для клиента


};
VARS.client = new ApolloClient({
    uri: VARS.URL + 'graphql',

});

function numberWithSpacesInt(x) {
    
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
function numberWithSpacesFloat(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
export {VARS,numberWithSpacesInt,numberWithSpacesFloat};
