import React, {useContext, useState} from 'react';
import { VARS } from './VARS.js';
import { ApolloProvider } from 'react-apollo';
import { SelTapeProd } from './comp/tapeproduktion'
import './App.css';
import { CalcStateContext, LoginContext } from'./comp/contexts';
import Cookie from "js-cookie";
import Auth from "./comp/auth";
import ListModules from './comp/tepeoflednodule';
import { SelCabinet } from './comp/tapeofcabinet'
import { ScreenSize } from './comp/screensize';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { MyDocument } from './comp/testPDF'
import { AddonsOne } from './comp/addonsOne'
import { AddonsTwo } from  './comp/addonsTwo'
import { AddonsThree } from "./comp/addonsThree";
import { PriceUpAndSale } from './comp/priceUpAndSale'
import { DaysInstall } from './comp/daysInstall'
import { UsersList } from './comp/usersList'
import ApolloClient from "apollo-boost";


function App (){
    let date = new Date()
    const [context, setContext] = useState(1);
    const [login, setLogin] = useState(0)
    if (!Cookie.get("token") && !Cookie.get("login")){
        return (
                <div className={"application"}>
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
                                            return <ListModules/>;
                                            break;
                                        case 3:
                                            return <SelCabinet/>
                                            break;
                                        case 4:
                                            return <ScreenSize/>
                                            break;
                                        case 5:
                                            return <AddonsOne/>
                                            break;
                                        case 6:
                                            return <AddonsTwo/>
                                            break;
                                        case 7:
                                            return <AddonsThree/>
                                        case 8:
                                            return <PriceUpAndSale/>
                                            break;
                                        case 9:
                                            return <DaysInstall/>
                                            break;
                                        case 10:
                                            return <UsersList/>
                                            break;
                                        case 11:
                                            return (

                                                <div>
                                                    <PDFDownloadLink document={<MyDocument/>}
                                                                     fileName={date + "_" + VARS.priceUP + "PU_" + VARS.priceSale + "PS" + ".pdf"}>
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
                <button onClick={()=>{
                    setContext(1);
                    logout()
                }}>Выйти</button>
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
