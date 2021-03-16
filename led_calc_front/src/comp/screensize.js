import React, {useContext, createRef} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts';

export function ScreenSize() {
    const [context, setContext] = useContext(CalcStateContext);
    let widthInputRef = createRef();
    let heightInputRef = createRef();
    
    const submitSize = () => {
        //Расчет размеров при вводе onChange
        
        
        VARS.screenSizeInputWidth = widthInputRef.value;
        VARS.screenSizeInputHeight = heightInputRef.value;
        console.log(VARS.screenSizeInputWidth);
        console.log(VARS.screenSizeInputHeight);
        VARS.screenCabinetWidth = Math.floor(VARS.screenSizeInputWidth/VARS.cabinet.width);
        VARS.screenCabinetHeigth = Math.floor(VARS.screenSizeInputHeight/VARS.cabinet.height);
        VARS.screenSizeWidth = VARS.screenCabinetWidth*VARS.cabinet.width;
        VARS.screenSizeHeight = VARS.screenCabinetHeigth*VARS.cabinet.height;
        console.log("Размер экр ", VARS.screenSizeWidth,"ш x ", VARS.screenSizeHeight, "в");
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