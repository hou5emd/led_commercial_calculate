import React, { useContext } from 'react';
import { VARS } from '../VARS.js';

import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {parseJSON, checkStatus} from "./resptests";
import {CalcStateContext} from "./contexts";



class ListModules extends React.Component {
    state = {
        download: true,
        requestList: ''

    }

    static contextType  = CalcStateContext;

    getLedModule = (e) => {
        const [context, setContext] = this.context;
        let moduleKey = e.target.value;
        console.log(moduleKey);
        VARS.module = this.state.requestList[moduleKey];
        console.log(VARS.module);
        setContext(3);
    }
    async componentDidMount() {

        try {
            const requestList = await fetch(VARS.URL + 'led-modulis?_where[typeOfProduct]?id=' + VARS.typeOfProductID, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            this.setState({
                download: false,
                requestList: requestList
            });

        } catch (error) {
            console.log(error);

        }

    }


    render() {
        if (this.state.download){
            return <div>Заргузка данных....</div>
        }

        const selListModule = this.state.requestList.map((item, key) =>
            <option value={key} >{item.Model}</option>
        );
        console.log(this.state.requestList);
        return (
            <select onChange={(e) => {this.getLedModule(e)}}>
                <option disabled={true} selected>Выберите модуль</option>
                {selListModule}
            </select>

        )
    }




}

export default ListModules;