import React, {useContext, createRef} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts';

export function ScreenSize() {
    const [context, setContext] = useContext(CalcStateContext);
    let widthInputRef = createRef();
    let heightInputRef = createRef();
    
    const submitSize = () => {
        //Расчет размеров при вводе onChange
        
        
        VARS.screenSizeInputWidth = widthInputRef.value; //Считываем введенное значение ширины через реф
        VARS.screenSizeInputHeight = heightInputRef.value; //Считываем значение высоты через реф
        console.log(VARS.screenSizeInputWidth);
        console.log(VARS.screenSizeInputHeight);
        VARS.screenCabinetWidth = Math.floor(VARS.screenSizeInputWidth/VARS.cabinet.width); //Расчет ширины в кабинетах
        VARS.screenCabinetHeigth = Math.floor(VARS.screenSizeInputHeight/VARS.cabinet.height); //Расчет высоты в кабинетах
        VARS.screenSizeWidth = VARS.screenCabinetWidth*VARS.cabinet.width;  //Расчет ширины в мм
        VARS.screenSizeHeight = VARS.screenCabinetHeigth*VARS.cabinet.height; //Расчет высоты  в мм
        VARS.cabinetSumm = VARS.screenCabinetWidth*VARS.screenCabinetHeigth; //Сумма кабинетов
        VARS.priceInWork = Math.round(VARS.cabinetSumm * VARS.cabinet.price * VARS.usdrub); //Цена экрана в рублях без доп оборудования
        console.log("Размер экр ", VARS.screenSizeWidth,"ш x ", VARS.screenSizeHeight, "в. Количество кабинетов: ", VARS.cabinetSumm, "Цена в рублях: ", VARS.priceInWork);
        setContext(5);
    }

    return (
        <div className={'screen-size'}>
            <label>
                Введите желаемую ширину экрана в мм
                <input ref={(input) => widthInputRef = input} tape="number"  placeholder="в миллиметрах"></input>
            </label>
            <label>
                Введите желаемую высоту экрана в мм
                <input ref={(input) => heightInputRef = input} tape="number" placeholder="в миллиметрах"></input>
            </label>
            <button onClick={submitSize}>Следующий шаг</button>
        </div>        
    );
}