import ApolloClient from 'apollo-boost';
import SelTapeProd from "./comp/tapeproduktion";





const VARS = {
    URL: "http://192.168.0.42:1337/",
    client: '',
    typeOfProductID: '',
    module: {},
    cabinet:{},
    shablon: null,
    screenSizeInputWidth: null,
    screenSizeInputHeight: null,
    screenSizeWidth:null,
    screenSizeHeight:null,
    screenCabinetWidth:null,
    screenCabinetHeigth:null



};
VARS.client = new ApolloClient({
    uri: VARS.URL + 'graphql',

});
export {VARS};
