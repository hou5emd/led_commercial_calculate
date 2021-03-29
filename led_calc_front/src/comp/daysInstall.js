import React, {Component} from 'react';
import { CalcStateContext } from './contexts'
import {VARS} from '../VARS'

export class DaysInstall extends Component {
    static contextType = CalcStateContext
    state={
        daysPost:null,
        daysPostText:"рабочих дней",
        daysInstall:null,
        daysInstallText:"рабочих дней",
        daysStartingWork:null,
        daysStartingWorkText:"рабочих дней",

    }

    stepUpDwn = (x) => {
        const [context, setContext] = this.context
        if (this.state.daysPost !== null && this.state.daysInstall !== null && this.state.daysStartingWork !== null ) {
            VARS.daysPost = this.state.daysPost
            VARS.daysInstall = this.state.daysInstall
            VARS.daysStartingWork = this.state.daysStartingWork
            VARS.daySumm = parseInt(this.state.daysPost,10) + parseInt(this.state.daysInstall,10) + parseInt(this.state.daysStartingWork,10)
            setContext(context + x);
        } else {
            alert('Не все данные заполнены!')
        }

    }

    render() {
        return (
            <div>
                <label>
                    Введите срок поставки
                    <input type="number" placeholder={"Дней"} onChange={({target}) => {this.setState({daysPost: target.value})}}/>
                </label>
                <label>
                    Введите срок монтажа
                    <input type="number" placeholder={"Дней"} onChange={({target}) => {this.setState({daysInstall: target.value})}}/>
                </label>

                <label>
                    Введите срок пусконаладки
                    <input type="number" placeholder={"Дней"} onChange={({target}) => {this.setState({daysStartingWork: target.value})}}/>
                </label>

                <button className={"bt primary1-bt"} onClick={() => {this.stepUpDwn(-1)}}>Шаг назад</button>
                <button className={"bt primary1-bt"} onClick={() => {this.stepUpDwn(1)}}>Следующий шаг</button>
            </div>
        );
    }
}

