import React, {useContext, createRef,useState} from 'react'
import { VARS, numberWithSpacesFloat } from '../VARS'
import { CalcStateContext } from './contexts'





function x(y){
    return  y + (y/100*VARS.priceUP) - (y + (y/100*VARS.priceUP))/100 * VARS.priceSale;
}
function percent(x,p){
    return x + (x/100*p);
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

    if (VARS.priceSale > 0){
        if (VARS.percentAddons < 0){
            VARS.percentAddons = 0
        }
        if (VARS.percentGadjets < 0){
            VARS.percentGadjets = 0
        }
        if (VARS.percentLed < 0){
            VARS.percentLed = 0
        }
    }
    if (VARS.percentAddons < 0 || VARS.percentGadjets < 0 || VARS.percentLed < 0){
        VARS.priceSale = 0
    }

        VARS.priceOutLED = x(VARS.priceInWork);
        VARS.pcPrice = x(VARS.pcPrice);
        VARS.scrdPrice = x(VARS.scrdPrice);
        VARS.installationPrice = x(VARS.installationPrice);
        VARS.videoCpuPrice = x(VARS.videoCpuPrice);
        VARS.electroBoxPrice = x(VARS.electroBoxPrice);
        VARS.electroProjectsPrice = x(VARS.electroProjectsPrice);
        VARS.projectKMPrice = x(VARS.projectKMPrice);
        VARS.agreementPrice = x(VARS.agreementPrice);



        VARS.priceOutLED = percent(VARS.priceOutLED, VARS.percentLed);



        VARS.installationPrice = percent(VARS.installationPrice, VARS.percentAddons);
        VARS.electroProjectsPrice = percent(VARS.electroProjectsPrice, VARS.percentAddons);
        VARS.projectKMPrice = percent(VARS.projectKMPrice, VARS.percentAddons);
        VARS.agreementPrice = percent(VARS.agreementPrice, VARS.percentAddons);



        VARS.pcPrice = percent(VARS.pcPrice, VARS.percentGadjets);
        VARS.scrdPrice = percent(VARS.scrdPrice, VARS.percentGadjets);
        VARS.videoCpuPrice = percent(VARS.videoCpuPrice, VARS.percentGadjets);
        VARS.electroBoxPrice = percent(VARS.electroBoxPrice, VARS.percentGadjets);






    VARS.fullPrice = VARS.priceOutLED + VARS.pcPrice + VARS.scrdPrice + VARS.installationPrice + VARS.videoCpuPrice + VARS.electroBoxPrice + VARS.electroProjectsPrice + VARS.projectKMPrice + VARS.agreementPrice;
    VARS.priceFullImportants = VARS.priceOutLED + VARS.scrdPrice + VARS.pcPrice;
    VARS.priceFullAddons = VARS.installationPrice + VARS.videoCpuPrice + VARS.electroBoxPrice + VARS.electroProjectsPrice + VARS.projectKMPrice + VARS.agreementPrice;



}


function PriceUpAndSale(){
    countPrices();
    const [upPriceValue, setUpPriceValue] = useState(0);
    const [sale, setSale] = useState(0);
    const [context, setContext] = useContext(CalcStateContext);
    const [percentMontage, setPM] = useState(0);
    const [percentLed, setPl] = useState(0);
    const [percentAdd, setPa] = useState(0);
    const [displaySale, setDs] = useState("block")
    const [displaySaleDot, setDSD] = useState("block")

    const ds = (x) =>{
        if (x < 0){
            setDs("none");
        } else {
            setDs("block");
        }
    }
    const onChangeUpPrice = (e) =>{
        setUpPriceValue(e.target.value);
        VARS.priceUP = parseInt(e.target.value,10);
        countPrices();
    }

    const onChangeSalePrice = (e) =>{
        setSale(e.target.value);
        /*if (e.target.value > 0){
            setDSD("none")
        } else {
            setDSD("block")
        }*/
        VARS.priceSale = parseInt(e.target.value);
        countPrices();
    }
    const onChangePercentMontage = (target) =>{
        VARS.percentAddons = parseInt(target.value);
        ds(target.value);
        setPM(VARS.percentAddons);

    }
    const onChangePercentLed = (target) => {
        VARS.percentLed = parseInt(target.value);
        ds(target.value);
        setPl(VARS.percentLed);
    }

    const onChangePercentAdd = (target) =>{
        VARS.percentGadjets = parseInt(target.value);
        ds(target.value);
        setPa(VARS.percentGadjets);
    }

    const stepUpDwn = (x) => {
        countPrices();
        setContext(context+x);
    }

    return(
        <div className={"salePrice"}>
            <span style={{display:`${displaySaleDot}`}} style={{fontWeight:"bold"}}>{percentLed}% наценки/скидки на LED экран</span><br/>
            <input style={{marginBottom:"0.5rem",display:`${displaySaleDot}`}} type="range" min={-15} max={100} defaultValue={0} step={1} onChange={({target}) => onChangePercentLed(target)}/>
            <span style={{marginBottom:"2rem",display:"block"}}>Цена экрана {numberWithSpacesFloat(VARS.priceOutLED.toFixed(2))}</span>

            <span  style={{fontWeight:"bold",display:`${displaySaleDot}`}}>{percentAdd}% наценки/скидки на доп оборудование</span>
            <input style={{marginBottom:"0.5rem",display:`${displaySaleDot}`}} type="range" min={-15} max={100} defaultValue={0} step={1} onChange={({target}) => onChangePercentAdd(target)}/>
            <span style={{whiteSpace:"pre",marginBottom:"2rem",display:"block"}}>{
                "ПК "+numberWithSpacesFloat(VARS.pcPrice.toFixed(2))+`\n`+
                "Отправляющая карта "+numberWithSpacesFloat(VARS.scrdPrice.toFixed(2))+`\n`+
                "Видео процессор "+numberWithSpacesFloat(VARS.videoCpuPrice.toFixed(2))+`\n`+
                "Электрощит "+numberWithSpacesFloat(VARS.electroBoxPrice.toFixed(2))
            }</span>
            <span style={{fontWeight:"bold",display:`${displaySaleDot}`}}>{percentMontage}% наценки/скидки на монтаж, проект и согласование</span>
            <input style={{marginBottom:"0.5rem",display:`${displaySaleDot}`}} type="range" min={-15} max={100} defaultValue={0} step={1} onChange={({target}) => onChangePercentMontage(target)}/>
            <span style={{whiteSpace:"pre",marginBottom:"2rem",display:"block"}}>
                Монтаж {numberWithSpacesFloat(VARS.installationPrice.toFixed(2)).toString()}{`\n`}
                Электро проект {numberWithSpacesFloat(VARS.electroProjectsPrice.toFixed(2))}{`\n`}
                Проект МК {numberWithSpacesFloat(VARS.projectKMPrice.toFixed(2))}{`\n`}
                Согласование {numberWithSpacesFloat(VARS.agreementPrice.toFixed(2))}
            </span>

            <span style={{fontWeight:"bold"}}>{upPriceValue}% Наценки общ.</span>
            <input type="range" min={0} max={100} step={1} defaultValue={0} onChange={event => onChangeUpPrice(event)}/>
            <span style={{fontWeight:"bold", display:`${displaySale}`}}>{sale}% Скидки общ.</span>
            <input style={{display:`${displaySale}`}} type="range" min={0} max={15} step={1} defaultValue={0} onChange={event => onChangeSalePrice(event)}/>
            <div style={{fontWeight:"bold",marginBottom:"1rem"}}>
                Изменение цены проекта
                <div>{numberWithSpacesFloat(VARS.fullPrice.toFixed(2))}</div>
            </div>
            <button className={"bt second-bt"} onClick={() => {stepUpDwn(-1)}}>Шаг назад</button>
            <button className={"bt primary1-bt"} onClick={() => {stepUpDwn(1)}}>Следующий шаг</button>
        </div>
    );


}

export {PriceUpAndSale}
