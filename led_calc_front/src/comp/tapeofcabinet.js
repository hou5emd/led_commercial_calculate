import React, { useContext } from 'react';
import { VARS } from '../VARS.js';
import {CalcStateContext} from "./contexts";

export function SelCabinet(){
    const [context, setContext] = useContext(CalcStateContext);
    const moduleTape = VARS.module;
    const tapeOfCabinetList = moduleTape.modelCabinet.map((item, key) =>
        <option value={key}>{item.modelCabinet}</option>
    );
    const nextStep = () => {
        if (VARS.cabinet.id >= 0) {
            setContext(4);
        } else {
            alert("Вы ничего не выбрали")
        }
    }

    const ChangeCabinet = (e) =>{
        VARS.cabinet = moduleTape.modelCabinet[e.target.value];
        console.log(VARS.cabinet);

    }

    return(
        <div>
            <select onChange={(e) => ChangeCabinet(e)}>
                <option disabled={true} selected value={null}>Выберите модель кабинета</option>
                {tapeOfCabinetList}
            </select>
            <button className={"bt primary1-bt"} onClick={() => {setContext(context-1)}}>Шаг назад</button>
            <button className={"bt primary1-bt"} onClick={nextStep}>Следующий шаг</button>
        </div>
    )
}

