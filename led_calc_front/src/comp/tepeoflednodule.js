import React from 'react';
import { VARS } from '../VARS.js';
import './resptests';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {parseJSON, checkStatus} from "./resptests";



class ListModules extends React.Component {
    state = {
        download: true,
        requestList: ''

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

    getLedModule = (e) => {
        let moduleSel = e.target;
        let moduleKey = moduleSel.getAttribute("arrid");
        console.log(moduleKey);
        VARS.module = this.state.requestList[moduleKey];
        console.log(VARS.module);
    }
    render() {
        if (this.state.download){
            return <div>Заргузка данных....</div>
        }

        const selListModule = this.state.requestList.map((item, key) =>
            <option value={item.id} arrid={key} >{item.Model}</option>
        );
        console.log(this.state.requestList);
        return (
            <select onChange={(e) => {this.getLedModule(e)}}>
                <option disabled={true} selected>Выберите модуль</option>
                {selListModule}
            </select>

        )
    }
    constructor() {
        super();
    }



}

export default ListModules;