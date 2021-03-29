import React, {useContext, createRef,useState} from 'react'
import { VARS, numberWithSpacesFloat } from '../VARS'
import { CalcStateContext } from './contexts'





function x(y){

    return  y + (y/100*VARS.priceUP) - (y + (y/100*VARS.priceUP))/100 * VARS.priceSale;
}
function countPrices(){
    VARS.pcPrice = VARS.selectedPC.price * VARS.usdrub; //Расчет цены пк в рублях
    console.log(VARS.pcPrice);
    VARS.pcPrice = VARS.pcPrice / 100 * (VARS.selectedPC.priceUp + 100); //Расчет цены пк в рублях с наценкой
    console.log(VARS.pcPrice);
    VARS.monitorPrice = VARS.selectedMonitor.price * VARS.usdrub; //Расчет цены монитора в рублях
    VARS.monitorPrice = VARS.monitorPrice + VARS.monitorPrice/100*VARS.selectedMonitor.priceUp; //Расчет цены монитора в рублях с наценкой
    VARS.pcPrice += VARS.monitorPrice;//Стоимость пк = смоимость пк + монитор
    VARS.scrdPrice = VARS.selectedSCRD.price * VARS.usdrub * VARS.selectedSCRDcount;//Расчет цены отправляшек в рублях * на количество
    VARS.scrdPrice = VARS.scrdPrice + VARS.scrdPrice/100*VARS.selectedSCRD.priceUp; //Расчет цены отправляшек в рублях c наценкой

    VARS.installationPrice = (VARS.selectedInstallations.price + VARS.selectedInstallations.price/100*VARS.selectedInstallations.priceUp)*VARS.screenP;
//Выше рачет цены монтажа * на площадь
    VARS.videoCpuPrice = VARS.selectedVideoCpu.price * VARS.usdrub / 100 * (100 + VARS.selectedVideoCpu.priceUp);//Расчет цены видео процессора
    VARS.electroBoxPrice = VARS.selectedElectroBox.price/100*(100 + VARS.selectedElectroBox.priceUp);
    if (VARS.electroBoxPrice > 0){
        VARS.electroBoxPrice = VARS.electroBoxPrice * Math.log(VARS.electroBoxPrice)/Math.log(VARS.electroBoxPrice/VARS.screenP/300+VARS.screenP)*VARS.screenP;
    }

//Выше ооооочень сложный расчет цены электрощита от площади экрана.

    VARS.electroProjectsPrice = VARS.selectedElectroProjects.price/100*(100+VARS.selectedElectroProjects.priceUp);//Цена электропроекта
    VARS.projectKMPrice = VARS.selectedProjectKM.price/100*(100+VARS.selectedProjectKM.proceUp);//Цена Проекта констр части
    VARS.agreementPrice = VARS.selectedAgree.price/100*(100+VARS.selectedAgree.priceUp);//Цена согласования

    console.log(VARS);

    VARS.priceOutLED = x(VARS.priceInWork);
    VARS.pcPrice = x(VARS.pcPrice);
    VARS.scrdPrice = x(VARS.scrdPrice);
    VARS.installationPrice = x(VARS.installationPrice);
    VARS.videoCpuPrice = x(VARS.videoCpuPrice);
    VARS.electroBoxPrice = x(VARS.electroBoxPrice);
    VARS.electroProjectsPrice = x(VARS.electroProjectsPrice);
    VARS.projectKMPrice = x(VARS.projectKMPrice);
    VARS.agreementPrice = x(VARS.agreementPrice);

    VARS.fullPrice = VARS.priceOutLED + VARS.pcPrice + VARS.scrdPrice + VARS.installationPrice + VARS.videoCpuPrice + VARS.electroBoxPrice + VARS.electroProjectsPrice + VARS.projectKMPrice + VARS.agreementPrice;
    VARS.priceFullImportants = VARS.priceOutLED + VARS.scrdPrice + VARS.pcPrice;
    VARS.priceFullAddons = VARS.installationPrice + VARS.videoCpuPrice + VARS.electroBoxPrice + VARS.electroProjectsPrice + VARS.projectKMPrice + VARS.agreementPrice;



}


function PriceUpAndSale(){
    countPrices();
    const [upPriceValue, setUpPriceValue] = useState(0);
    const [sale, setSale] = useState(0);
    const [context, setContext] = useContext(CalcStateContext);

    const onChangeUpPrice = (e) =>{
        setUpPriceValue(e.target.value);
        VARS.priceUP = parseInt(e.target.value,10);
        countPrices();
    }

    const onChangeSalePrice = (e) =>{
        setSale(e.target.value);
        VARS.priceSale = parseInt(e.target.value);
        countPrices();
    }

    const stepUpDwn = (x) => {
        countPrices();
        setContext(context+x);
    }

    return(
        <div className={"salePrice"}>
            <input type="range" min={0} max={100} step={1} defaultValue={0} onChange={event => onChangeUpPrice(event)}/>
            <span>{upPriceValue}% Наценки</span>
            <input type="range" min={0} max={20} step={1} defaultValue={0} onChange={event => onChangeSalePrice(event)}/>
            <span>{sale}% Скидки</span>
            <div>
                Изменение цены проекта
                <div>{numberWithSpacesFloat(VARS.fullPrice.toFixed(2))}</div>
            </div>
            <button className={"bt primary1-bt"} onClick={() => {stepUpDwn(-1)}}>Шаг назад</button>
            <button className={"bt primary1-bt"} onClick={() => {stepUpDwn(1)}}>Следующий шаг</button>
        </div>
    );


}

export {PriceUpAndSale}