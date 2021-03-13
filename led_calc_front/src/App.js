import React from 'react';
import { VARS } from './VARS.js';
import { ApolloProvider } from 'react-apollo';

import './App.css';


function App() {
    return (
        <ApolloProvider client={VARS.client}>
                <VARS.renderState />
        </ApolloProvider>

    );
}


export default App;
