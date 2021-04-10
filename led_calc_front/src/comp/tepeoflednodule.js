import React, { useContext } from 'react';
import { VARS } from '../VARS.js';

import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {parseJSON, checkStatus} from "./resptests";
import {CalcStateContext} from "./contexts";
import { SelCabinet } from './tapeofcabinet'



class ListModules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeOfProductID:props.typeOfProductID,
            download: true,
            requestList: '',
            cabinets:<p className={'wait'}>Жду выбора модуля...</p>,

        }
    }


    static contextType  = CalcStateContext;

    getLedModule = (e) => {

        let moduleKey = e.target.value;
        console.log(moduleKey);
        VARS.module = this.state.requestList[moduleKey];
        console.log(VARS.module);
        this.setState({
            cabinets:<SelCabinet module={this.state.requestList[moduleKey]} />,
        })

    }


    async dataModules() {

        try {
            const requestList = await fetch(VARS.URL + 'led-modulis?_where[typeOfProduct]?id=' + this.props.typeOfProductID, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjE2MDg1NDUwLCJleHAiOjE2MTg2Nzc0NTB9.S3iICAYvJlQvcuvzg42mQbqdvCfO4i0qQozz2iFszT4"
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

    componentDidMount() {
        if (this.props.typeOfProductID) {
            this.dataModules();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.typeOfProductID !== this.props.typeOfProductID){
            this.dataModules();
            this.setState({
                cabinets:<p className={'wait'}>Жду выбора модуля...</p>,
            });
        }
    }


    render() {

        if (this.state.download){
            return (<p className={'wait'}>Загрузка списка модулей...</p>);
        }

        const selListModule = this.state.requestList.map((item, key) =>
            <option value={key} >{item.Model}</option>
        );

        return (
            <div className={'screen-size'}>
                <select onChange={(e) => {this.getLedModule(e)}} value={VARS.module.id}>
                    <option disabled={true} selected>Выберите модуль</option>
                    {selListModule}
                </select>
                {this.state.cabinets}
            </div>

        )
    }




}

export default ListModules;
