import logo from './logo.svg';
import VARS from'./VARS.js';
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
            typeofLedScreen: 'videoEkranyUlichnyes'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('Вы выбрали' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Выберите считаемую продукцию:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="videoEkranyUlichnyes">Уличные видеоэкраны</option>
                        <option value="videoEkranyInterernye">Интерьерные видеоэкраны</option>
                        <option value="mediafasadies">Медиафасады</option>
                    </select>
                </label>
                <input type="submit" value="Далее" />
            </form>
        );
    }

}

export default App;
