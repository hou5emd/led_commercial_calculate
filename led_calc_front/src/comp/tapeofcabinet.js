import React, { useContext } from 'react';
import { VARS } from '../VARS.js';
import {CalcStateContext} from "./contexts";

export function SelCabinet(){
    const [context, setContext] = useContext(CalcStateContext);
    const moduleTape = VARS.module;
    const tapeOfCabinetList = moduleTape.modelCabinet.map((item, key) =>
        <option value={key}>{item.modelCabinet}</option>
    );

    const ChangeCabinet = (e) =>{
        VARS.cabinet = moduleTape.modelCabinet[e.target.value];
        console.log(VARS.cabinet);
        setContext(4);
    }

    return(
        <select onChange={(e) => ChangeCabinet(e)}>
            <option disabled={true} selected>Выберите модель кабинета</option>
            {tapeOfCabinetList}
        </select>
    )
}

