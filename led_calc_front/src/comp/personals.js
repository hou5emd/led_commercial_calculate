import React, {Component,useContext} from 'react';
import { CalcStateContext } from './contexts'
import { VARS } from '../VARS';

export class Personals extends Component {
    static contextType = CalcStateContext

    nextStep(){
        const [context,setContext] = this.context;
        if (VARS.persona) {
            setContext(context + 1)
        } else {
            alert("Заполните поле")
        }
    }
    render() {
        const [context,setContext] = this.context;
        return (
            <div>
                <label>
                    Для кого кп?
                    <input onChange={({target})=>{VARS.persona =  target.value}} type="text"/>
                </label>
                <button className={"bt primary1-bt"} onClick={() => {setContext(context-1)}}>Шаг назад</button>
                <button className={"bt primary1-bt"} onClick={() => {this.nextStep()}}>Получить кп</button>
            </div>
        );
    }
}

