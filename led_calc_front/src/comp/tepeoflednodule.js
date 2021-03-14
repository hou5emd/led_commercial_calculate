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

    render() {
        if (this.state.download){
            return <div>Заргузка данных....</div>
        }
        const fetchJson = this.state.requestList.map((item) =>
            <option value={item.id}>{item.Model}</option>
        );
        console.log(this.state.requestList);
        return (
            <select>
                <option disabled={true} selected>Выберите модуль</option>
                {fetchJson}
            </select>

        )
    }



}

export default ListModules;