import React, {Component} from 'react';
import { CalcStateContext } from './contexts'
import {VARS} from '../VARS'
import {checkStatus, parseJSON} from "./resptests";
import axios from 'axios'
import Cookie from "js-cookie";

export class UsersList extends Component {
    static contextType = CalcStateContext
    state={
        dl:false,
        list:<p>Загрузка полей менеджера</p>,
        users:null,
    }

    componentDidMount() {
        return new Promise((resolve, reject) => {
            axios
                .get(VARS.URL+`users/me`, {
                    headers:{
                        Authorization:VARS.AUTORIZ,
                    }
                })
                .then(({data}) => {
                    const [context, setContext] = this.context
                    VARS.userActive = data
                    //set token response from Strapi for server validation
                    console.log(data);
                    //resolve the promise to set loading to false in SignUp form
                    resolve(data);
                    setContext(context+1);


                })
                .catch((error) => {
                    //reject the promise and pass the error object back to the form
                    console.log(error);
                });
        });
    }



    render() {

        return (
            <div>Загрузка контактных данных</div>
        );
    }
}

