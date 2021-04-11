import React, {useContext, useState} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts';
import {checkStatus, parseJSON} from "./resptests";

export function ScreenSize() {
    const [context, setContext] = useContext(CalcStateContext);
    const [listSizeW, setListSizeW] = useState({w1:0,w2:0,});
    const [listSizeH, setListSizeH] = useState({h1:0, w2:0,});








    const changeWidth = (target) => {
        let w = parseInt(target.value)
        setListSizeW({
            w1:Math.trunc(w / VARS.cabinet.width) * VARS.cabinet.width,
            w2:Math.trunc(w / VARS.cabinet.width) * VARS.cabinet.width + VARS.cabinet.width,

        })
        //VARS.screenSizeInputWidth = e.target.value;//Считываем введенное значение ширины
        //VARS.screenSizeInputWidth = parseInt(VARS.screenSizeInputWidth,10);
    }
    const changeHeight = (target) => {
        let h = parseInt(target.value)
        setListSizeH({
            h1:Math.trunc(h / VARS.cabinet.height) * VARS.cabinet.height,
            h2:Math.trunc(h / VARS.cabinet.height) * VARS.cabinet.height + VARS.cabinet.height,

        })
    }

    const selSizes = (target) =>{
        let s = target.value.split(",")
        VARS.screenSizeInputWidth = parseInt(s[0])
        VARS.screenSizeInputHeight = parseInt(s[1])
        console.log(VARS.screenSizeInputWidth,"   ",VARS.screenSizeInputHeight)
    }

    const submitSize = () => {
        //Расчет размеров при вводе onChange
        if (VARS.screenSizeInputWidth < VARS.cabinet.width || VARS.screenSizeInputHeight < VARS.cabinet.height){
            alert("Как то маловат экран :)")
        } else {
            console.log(VARS.screenSizeInputWidth);
            console.log(VARS.screenSizeInputHeight);
            VARS.screenCabinetWidth = VARS.screenSizeInputWidth / VARS.cabinet.width; //Расчет ширины в кабинетах
            VARS.screenCabinetHeigth = VARS.screenSizeInputHeight / VARS.cabinet.height; //Расчет высоты в кабинетах
            VARS.screenSizeWidth = VARS.screenCabinetWidth * VARS.cabinet.width;  //Расчет ширины в мм
            VARS.screenSizeHeight = VARS.screenCabinetHeigth * VARS.cabinet.height; //Расчет высоты  в мм
            VARS.cabinetSumm = VARS.screenCabinetWidth * VARS.screenCabinetHeigth; //Сумма кабинетов
            VARS.screenP = (VARS.screenSizeWidth * VARS.screenSizeHeight / 1000 / 1000);
            if (VARS.cabinet.width === VARS.module.moduleWidth && VARS.cabinet.height === VARS.module.moduleHeight){
                VARS.screenWeight = VARS.screenP * VARS.cabinet.weight;
            } else {
                VARS.screenWeight = VARS.cabinetSumm * VARS.cabinet.weight;
            }

            VARS.priceInWork = VARS.cabinetSumm * VARS.cabinet.price * VARS.usdrub / 100 * (100 + VARS.cabinet.priceUp);
            (VARS.cabinet.width === VARS.module.moduleWidth && VARS.cabinet.height === VARS.module.moduleHeight)?VARS.screenTape = "Модульный":VARS.screenTape = "Кабинетный"
            console.log("Размер экр ", VARS.screenSizeWidth, "ш x ", VARS.screenSizeHeight, "в. Количество кабинетов: ", VARS.cabinetSumm, "Цена в рублях: ", VARS.priceInWork);
            VARS.screenResolutionW = VARS.screenSizeWidth/VARS.module.moduleWidth*VARS.module.resolutionWidth; //Разрешение по ширине
            VARS.screenResolutionH = VARS.screenSizeHeight/VARS.module.moduleHeight*VARS.module.resolutionHeight;//Разрешение по высоте

            VARS.maxKWT = (VARS.screenP * VARS.module.powerInputMaxM2 / 1000);
            VARS.avrKWT = (VARS.screenP * VARS.module.powerInputAverageM2 / 1000);
            console.table(VARS.screenP,VARS.maxKWT,VARS.avrKWT);
            getTemplate().then(checkStatus).then(parseJSON).then(resp => {
                VARS.shablon = resp
                console.log(VARS.shablon);
            });

            setContext(5);
        }
    }

    return (

        <div className={'screen-size'}>

            <label>
                Введите желаемую ширину экрана в мм
                <input onChange={({target}) => changeWidth(target) } tape="number"  placeholder="в миллиметрах"></input>
            </label>
            <label>
                Введите желаемую высоту экрана в мм
                <input onChange={({target}) => changeHeight(target) } tape="number" placeholder="в миллиметрах"></input>
            </label>
            <label>
                После ввода размеров выберите подходящий вариант экрана
                <select onChange={({target}) => selSizes(target)}>
                    <option disabled selected>Выбери вариант</option>
                    {(listSizeW.w1 > 0 && listSizeH.h1 > 0)?<option value={([listSizeW.w1,listSizeH.h1])}>Экран {listSizeW.w1} x {listSizeH.h1}</option>:''}
                    {(listSizeW.w2 > 0 && listSizeH.h1 > 0)?<option value={[listSizeW.w2,listSizeH.h1]}>Экран {listSizeW.w2} x {listSizeH.h1}</option>:''}
                    {(listSizeW.w1 > 0 && listSizeH.h2 > 0)?<option value={[listSizeW.w1,listSizeH.h2]}>Экран {listSizeW.w1} x {listSizeH.h2}</option>:''}
                    {(listSizeW.w2 > 0 && listSizeH.h2 > 0)?<option value={[listSizeW.w2,listSizeH.h2]}>Экран {listSizeW.w2} x {listSizeH.h2}</option>:''}
                </select>
            </label>
            <button className={"bt second-bt"} onClick={() => {setContext(context-1)}}>Шаг назад</button>
            <button className={"bt primary1-bt"} onClick={submitSize}>Следующий шаг</button>
        </div>
    );
}

async function getTemplate(){
    let out = await fetch(VARS.URL + "shablony-kps/"+ VARS.cabinet.shablon,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': VARS.AUTORIZ,
        }
    });
    return out
}
