import React,{ useContext } from "react";
import ApolloClient from 'apollo-boost';
import { parseJSON } from './comp/resptests';
import SelTapeProd from "./comp/tapeproduktion";
//import { CalcStateContext } from './comp/contexts';


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
    URL: process.env.REACT_APP_URL,
    AUTORIZ:null,
    client: '',
    usdrub:76, //Курс доллара
    typeOfProductID: null, //Тип продукции
    module: {}, //Обьект с параметрами модуля
    cabinet:{}, //Обьект с параметрами кабинета
    shablon: null, //обьект с параметрами шаблона
    screenSizeInputWidth: null, //Введенная ширина
    screenSizeInputHeight: null, //Введенная высота
    screenSizeWidth:null, //Расчетная ширана
    screenSizeHeight:null, //Расчетная высота
    screenCabinetWidth:null, //Кол. кабинетов по ширине
    screenCabinetHeigth:null, //Кол. кабинетов по высоте
    cabinetSumm:null, //Сумма кабинетов
    screenWeight:null, //Вес экрана
    screenTape:null,//Определение типа экрана
    screenResolutionW:null,
    screenResolutionH:null,
    screenP:null,
    maxKWT:null,//Максимальное потребление экрана
    avrKWT:null,//Среднее потребление экрана
    priceSale:0, //Процент кидки
    priceUP:0, //Процент наценки
    priceInWork:null, //Цена экрана до скидок и наценок
    priceOutLED:null, //Прайс для кп

    selectedPC:null,//Выбранный пк
    pcPrice:null,//Цена компа
    selectedSCRD:null,//Выбранная отправляющая
    selectedSCRDcount:1,//Колличество отправляющих
    scrdPrice:null,//Цена всех отправляшек
    selectedInstallations:null,//Выбранный тип монтажа
    installationPrice:null,//Цена монтажа
    selectedVideoCpu:null,//Выбранный видео проц
    videoCpuPrice:null,//Цена видео процессора
    selectedElectroBox:null,//Выбраный электрощит
    electroBoxPrice:null,//Цена электрощита
    selectedElectroProjects:null,//Выбранный электро проект
    electroProjectsPrice:null,//Цена электропроекта
    selectedProjectKM:null,//Проект Констр части
    projectKMPrice:null,//Цена проекта констр части
    selectedAgree:null,//выбранный тип согласования
    agreementPrice:null,//Цена согласования
    selectedMonitor:null,//Выбранный монитор
    monitorPrice:null,//Цена монитора


    percentLed:0, //Наценка на сам экран
    percentGadjets:0, //Наценка на железки
    percentAddons:0, //Наценка на допы

    fullPrice:0,//Цена проекта

    funcPercent:(x,p) =>{
        return x + (x/100*p)
    },
    funcElectroBox:(eb)=>{
        if (eb > 0){

            return eb * Math.log(eb)/Math.log(eb/VARS.screenP/300+VARS.screenP)*VARS.screenP;
        } else {
            return 0;
        }
    }


};


function numberWithSpacesInt(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
function numberWithSpacesFloat(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",");
}



export {VARS,numberWithSpacesInt,numberWithSpacesFloat};

