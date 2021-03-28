import React, {Component} from 'react';
import { CalcStateContext } from './contexts'
import {VARS} from '../VARS'
import {checkStatus, parseJSON} from "./resptests";

export class UsersList extends Component {
    static contextType = CalcStateContext
    state={
        dl:false,
        list:<p>Загрузка списка пользователей</p>,
        users:null,
    }

    async componentDidMount() {
        try {
            await fetch('https://bx.bmlife.ru/rest/27/rc4r13j17pisq8t6/user.get.json')
                .then(checkStatus)
                .then(parseJSON)
                .then(({result}) => this.userList(result));
        } catch (e) {
            console.log(e)
        }
    }
    onChangeUser (target){
        VARS.userActive = this.state.users[target.value]
        console.table(VARS.userActive)
    }

    stepUpDwn = (x) => {
        const [context, setContext] = this.context
        setContext(context+x);
    }

    userList = (result) => {
        console.log(result)
        let list = result.map((item,key) => <option value={key} hidden={!item.ACTIVE}>{item.NAME + ' ' + item.LAST_NAME}</option>)
        this.setState({
            users:result,
            list: <select onChange={({target}) => this.onChangeUser(target)}>
                        <option selected disabled>Выбери пользователя</option>
                        {list}
                    </select>,
        })

    }

    render() {

        return (
            <div>
                <label>
                    Выберите пользователя
                    {this.state.list}
                </label>
                <button onClick={() => {this.stepUpDwn(-1)}}>Шаг назад</button>
                <button onClick={() => {this.stepUpDwn(1)}}>Следующий шаг</button>
            </div>
        );
    }
}

