import React, {useContext, useState} from 'react';
import { VARS } from './VARS.js';
import { ApolloProvider } from 'react-apollo';
import { SelTapeProd } from './comp/tapeproduktion'
import './App.css';
import logo from './img/logo-dark.png'
import { CalcStateContext, LoginContext } from'./comp/contexts';
import Cookie from "js-cookie";
import Auth from "./comp/auth";

import { ScreenSize } from './comp/screensize';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { MyDocument } from './comp/testPDF'
import { AddonsOne } from './comp/addonsOne'
import { AddonsTwo } from  './comp/addonsTwo'
import { AddonsThree } from "./comp/addonsThree";
import { PriceUpAndSale } from './comp/priceUpAndSale'
import { DaysInstall } from './comp/daysInstall'
import { UsersList } from './comp/usersList'
import { Personals } from './comp/personals'
import ApolloClient from "apollo-boost";


function App (){
    let date = new Date()
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    const [context, setContext] = useState(1);
    const [login, setLogin] = useState(0)
    if (!Cookie.get("token") && !Cookie.get("login")){
        return (
                <div className={"application"}>
                    <img src={logo} alt="" className={"logo"}/>
                    <Auth setLogin={setLogin}/>
                </div>



        )
    } else {
        VARS.AUTORIZ = 'Bearer ' + Cookie.get("token")
        console.log(VARS.AUTORIZ)
        VARS.client = new ApolloClient({
            uri: VARS.URL + 'graphql',
            headers:{
                'Authorization':VARS.AUTORIZ,
            }

        });
        return (
            <div className={"application"}>
                <div className={"main-calc"}>
                    <ApolloProvider client={VARS.client}>

                        <CalcStateContext.Provider value={[context, setContext]}>
                            <CalcStateContext.Consumer>
                                {([context]) => {
                                    switch (context) {
                                        case 1:
                                            return <SelTapeProd/>;
                                            break;
                                        case 2:
                                            return <ScreenSize/>
                                            break;
                                        case 3:
                                            return <AddonsOne/>
                                            break;
                                        case 4:
                                            return <AddonsTwo/>
                                            break;
                                        case 5:
                                            return <AddonsThree/>
                                        case 6:
                                            return <PriceUpAndSale/>
                                            break;
                                        case 7:
                                            return <DaysInstall/>
                                            break;
                                        case 8:
                                            return <UsersList/>
                                            break;
                                        case 9:
                                            return <Personals />
                                            break;
                                        case 10:
                                            return (

                                                <div>
                                                    <PDFDownloadLink document={<MyDocument/>}
                                                                     fileName={date.toLocaleString("ru",options) + "_" + VARS.priceUP + "PU_" + VARS.priceSale + "PS" + ".pdf"}>
                                                        {({blob, url, loading, error}) => (loading ? 'Собираю кп...' : 'Скачать!')}
                                                    </PDFDownloadLink>
                                                </div>
                                            )
                                            break;
                                        default:
                                            <p>Упс</p>
                                    }
                                }}
                            </CalcStateContext.Consumer>
                        </CalcStateContext.Provider>


                    </ApolloProvider>
                </div>

                <div className={"footer"}>
                    <button className={"bt second-bt"} onClick={()=>{
                        setContext(1);
                        logout()
                    }}>Выйти</button>
                    <button className={"bt primary1-bt"} onClick={()=>{
                        setContext(1)
                    }}>Новое КП</button>
                </div>
            </div>

        );
    }
}
function logout(){
    //remove token and user cookie
    Cookie.remove("token");
    Cookie.remove("login");
    delete window.__user;
    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now());
    //redirect to the home page
    window.location.reload();

};

export default App;
