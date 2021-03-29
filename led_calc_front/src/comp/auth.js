import React, {Component, useContext} from 'react';
import {VARS} from '../VARS'
import { LoginContext } from './contexts'
import axios from 'axios'
import Cookie from "js-cookie";
import ApolloClient from "apollo-boost";


const API_URL = VARS.URL






class Auth extends Component {

    changeContext = () => {
        this.props.setLogin(1)
    }

    login(identifier, password){

        //prevent function from being ran on the server
        if (typeof window === "undefined") {
            return;
        }

        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}auth/local`, {
                    identifier:identifier ,
                    password:password
                })
                .then((res) => {

                    //set token response from Strapi for server validation
                    Cookie.set("token", res.data.jwt);
                    Cookie.set("login", true);
                    this.changeContext()
                    //resolve the promise to set loading to false in SignUp form
                    resolve(res);


                })
                .catch((error) => {
                    //reject the promise and pass the error object back to the form
                    console.log(error);
                });
        });
    };
    onLogin(event){
        event.preventDefault();
        console.log(event.target[1].form[0].value,'   ',event.target[1].form[1].value)
        this.login(event.target[1].form[0].value,event.target[1].form[1].value)
    }

    render() {
        return (
            <div>
                <form onSubmit={event => this.onLogin(event)}>
                    <label>
                        Введите e-mail
                        <input type="email" name="email" placeholder="example@mail.com"/>
                    </label>
                    <label>
                        Введите пароль
                        <input type="password" name="pass"/>
                    </label>
                    <button className={"bt primary1-bt"} tape="submit">Войти</button>
                </form>
            </div>
        );
    }
}

export default Auth;