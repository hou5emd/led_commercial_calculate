import React, { useState } from 'react';
import { VARS } from './VARS.js';
import { ApolloProvider } from 'react-apollo';
import { SelTapeProd } from './comp/tapeproduktion'
import './App.css';
import { CalcStateContext } from'./comp/contexts';
import ListModules from './comp/tepeoflednodule';


function App (){
    const [context, setContext] = useState(1);
    return (
        <ApolloProvider client={VARS.client}>

                <CalcStateContext.Provider value={[context, setContext]}>
                    <CalcStateContext.Consumer>
                        {([context]) => {
                            switch (context){
                                case 1:
                                    return <SelTapeProd />;
                                    break;
                                case 2:
                                    return <ListModules />;
                                    break;
                                default:
                                    <p>Упс</p>
                            }
                        }}
                    </CalcStateContext.Consumer>
                </CalcStateContext.Provider>



        </ApolloProvider>

    );
}


export default App;
