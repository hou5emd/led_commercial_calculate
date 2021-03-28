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
            VARS.daysPost = this.state.daysPost + " " + this.state.daysPostText
            VARS.daysInstall = this.state.daysInstall + " " + this.state.daysInstallText
            VARS.daysStartingWork = this.state.daysStartingWork + " " + this.state.daysStartingWorkText
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
                    <input type="number" placeholder={"Дней или недель"} onChange={({target}) => {this.setState({daysPost: target.value})}}/>
                </label>
                <label>
                    Как подписать в кп
                    <select onChange={({target}) => {this.setState({daysPostText: target.value})}}>
                        <option value="рабочих дней">рабочих дней</option>
                        <option value="рабочий день">рабочий день</option>
                    </select>
                </label>
                <label>
                    Введите срок монтажа
                    <input type="number" placeholder={"Дней или недель"} onChange={({target}) => {this.setState({daysInstall: target.value})}}/>
                </label>
                <label>
                    Как подписать в кп
                    <select onChange={({target}) => {this.setState({daysInstallText: target.value})}}>
                        <option value="рабочих дней">рабочих дней</option>
                        <option value="рабочий день">рабочий день</option>
                    </select>
                </label>
                <label>
                    Введите срок пусконаладки
                    <input type="number" placeholder={"Дней или недель"} onChange={({target}) => {this.setState({daysStartingWork: target.value})}}/>
                </label>
                <label>
                    Как подписать в кп
                    <select onChange={({target}) => {this.setState({daysStartingWorkText: target.value})}}>
                        <option value="рабочих дней">рабочих дней</option>
                        <option value="рабочий день">рабочий день</option>
                    </select>
                </label>
                <button onClick={() => {this.stepUpDwn(-1)}}>Шаг назад</button>
                <button onClick={() => {this.stepUpDwn(1)}}>Следующий шаг</button>
            </div>
        );
    }
}

