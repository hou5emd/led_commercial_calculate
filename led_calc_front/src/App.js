import React, { useState } from 'react';
import { VARS } from './VARS.js';
import { ApolloProvider } from 'react-apollo';
import { SelTapeProd } from './comp/tapeproduktion'
import './App.css';
import { CalcStateContext } from'./comp/contexts';
import ListModules from './comp/tepeoflednodule';
import { SelCabinet } from './comp/tapeofcabinet'
import { ScreenSize } from './comp/screensize';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { MyDocument } from './comp/testPDF'


function App (){
    const [context, setContext] = useState(1);
    return (
        <ApolloProvider client={VARS.client}>

                <CalcStateContext.Provider value={[context, setContext]}>
                    <CalcStateContext.Consumer>
                        {([context]) => {
                            switch (context){
                                case 5:
                                    return <SelTapeProd />;
                                    break;
                                case 2:
                                    return <ListModules />;
                                    break;
                                case 3:
                                    return <SelCabinet />
                                    break;
                                case 4:
                                    return <ScreenSize />
                                    break;
                                case 1:
                                    return (
                                        <div>
                                            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
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

    );
}


export default App;
