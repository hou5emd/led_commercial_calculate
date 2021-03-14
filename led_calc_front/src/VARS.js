import ApolloClient from 'apollo-boost';
import SelTapeProd from "./comp/tapeproduktion";





const VARS = {
    URL: "http://192.168.100.6:1337/",
    client: '',
    renderStep: 1,
    typeOfProductID: ''

};
VARS.client = new ApolloClient({
    uri: VARS.URL + 'graphql',

});
export {VARS};
