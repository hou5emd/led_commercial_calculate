import ApolloClient from 'apollo-boost';
import { parseJSON } from './comp/resptests';
import SelTapeProd from "./comp/tapeproduktion";


async function usdrub(){
    try{
        let requestList = await fetch("https://www.freeforexapi.com/api/live?pairs=USDRUB",{
             
            mode: 'no-cors',
           


        });
        console.log(requestList);
        return requestList.json();
    } catch {

    }
    
}


const VARS = {
    URL: "http://192.168.0.42:1337/",
    client: '',
    usdrub: usdrub(),
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
