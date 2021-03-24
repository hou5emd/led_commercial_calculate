import React, {useContext} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts';

export function ScreenSize() {
    const [context, setContext] = useContext(CalcStateContext);


    const changeWidth = (e) => {
        VARS.screenSizeInputWidth = e.target.value;//Считываем введенное значение ширины

    }
    const changeHeight = (e) => {
        VARS.screenSizeInputHeight = e.target.value;//Считываем значение высоты
    }
    
    const submitSize = () => {
        //Расчет размеров при вводе onChange
        if (VARS.screenSizeInputWidth < VARS.cabinet.width || VARS.screenSizeInputHeight < VARS.cabinet.height){
            alert("Как то маловат экран :)")
        } else {
            console.log(VARS.screenSizeInputWidth);
            console.log(VARS.screenSizeInputHeight);
            VARS.screenCabinetWidth = Math.floor(VARS.screenSizeInputWidth / VARS.cabinet.width); //Расчет ширины в кабинетах
            VARS.screenCabinetHeigth = Math.floor(VARS.screenSizeInputHeight / VARS.cabinet.height); //Расчет высоты в кабинетах
            VARS.screenSizeWidth = VARS.screenCabinetWidth * VARS.cabinet.width;  //Расчет ширины в мм
            VARS.screenSizeHeight = VARS.screenCabinetHeigth * VARS.cabinet.height; //Расчет высоты  в мм
            VARS.cabinetSumm = VARS.screenCabinetWidth * VARS.screenCabinetHeigth; //Сумма кабинетов
            VARS.screenWeight = VARS.cabinetSumm * VARS.cabinet.weight;
            VARS.priceInWork = VARS.cabinetSumm * VARS.cabinet.price * VARS.usdrub / 100 * (100);
            VARS.pricePreOut1 = VARS.priceInWork + VARS.priceInWork / 100 * VARS.priceUP;
            VARS.pricePreOut2 = VARS.pricePreOut1 - VARS.pricePreOut1 / 100 * VARS.priceSale; //Конечная цена
            VARS.priceOut = VARS.pricePreOut2.toFixed(2); //Цена экрана в рублях без доп оборудования
            (VARS.cabinet.width === VARS.module.moduleWidth && VARS.cabinet.height === VARS.module.moduleHeight)?VARS.screenTape = "Модульный":VARS.screenTape = "Кабинетный"
            console.log("Размер экр ", VARS.screenSizeWidth, "ш x ", VARS.screenSizeHeight, "в. Количество кабинетов: ", VARS.cabinetSumm, "Цена в рублях: ", VARS.priceOut);
            VARS.screenResolutionW = VARS.screenSizeWidth/VARS.module.moduleWidth*VARS.module.resolutionWidth; //Разрешение по ширине
            VARS.screenResolutionH = VARS.screenSizeHeight/VARS.module.moduleHeight*VARS.module.resolutionHeight;//Разрешение по высоте
            VARS.screenP = (VARS.screenSizeWidth * VARS.screenSizeHeight / 1000 / 1000).toFixed(1);
            VARS.maxKWT = (VARS.screenP * VARS.module.powerInputMaxM2 / 1000).toFixed(0);
            VARS.avrKWT = (VARS.screenP * VARS.module.powerInputAverageM2 / 1000).toFixed(0);
            console.table(VARS.screenP,VARS.maxKWT,VARS.avrKWT);
            setContext(5);
        }
    }

    return (
        <div className={'screen-size'}>
            <label>
                Введите желаемую ширину экрана в мм
                <input onChange={event => changeWidth(event) } tape="number"  placeholder="в миллиметрах"></input>
            </label>
            <label>
                Введите желаемую высоту экрана в мм
                <input onChange={event => changeHeight(event) } tape="number" placeholder="в миллиметрах"></input>
            </label>
            <button onClick={() => {setContext(context-1)}}>Шаг назад</button>
            <button onClick={submitSize}>Следующий шаг</button>
        </div>        
    );
}