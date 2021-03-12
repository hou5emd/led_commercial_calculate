import logo from './logo.svg';
import { VARS } from './VARS.js';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import React from 'react';
import './App.css';

function App() {
    return (
      <CalcForm />
    );
}



class CalcForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeofLedScreen: 'video-ekrany-ulichnyes'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({typeofLedScreen: event.target.value});
    }

    handleSubmit(event) {
        console.log('Вы выбрали' + this.state.typeofLedScreen);
        VARS.typeOfProduct = this.state.typeofLedScreen;
        // Fetch your restaurants immediately after the component is mounted
        const fetchTypeOfProduct = async () => {
            // Parses the JSON returned by a network request
            const parseJSON = resp => (resp.json ? resp.json() : resp);

            // Checks if a network request came back fine, and throws an error if not
            const checkStatus = resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return resp;
                }
                return parseJSON(resp).then(resp => {
                    throw resp;
                });
            };
            const headers = {
                'Content-Type': 'application/json',
              };
          
              try {
                const parsseTapeOfProduct = await fetch(VARS.URL + this.state.typeofLedScreen, {
                  method: 'GET',
                  headers: headers,
                })
                  .then(checkStatus)
                  .then(parseJSON);
                  
                
                console.log(parsseTapeOfProduct);  
              } catch (error) {
                console.log(error);
              }
            };
        
        fetchTypeOfProduct();

        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Выберите считаемую продукцию:
                    <select value={this.state.typeofLedScreen} onChange={this.handleChange}>
                        <option value="video-ekrany-ulichnyes">Уличные видеоэкраны</option>
                        <option value="video-ekrany-interernye">Интерьерные видеоэкраны</option>
                        <option value="mediafasadies">Медиафасады</option>
                    </select>
                </label>
                <input type="submit" value="Далее" />
            </form>
        );
    }

}

export default App;
