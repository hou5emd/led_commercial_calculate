import React, {Component} from 'react';
import logo from "../img/logo-dark.png";

class Header extends Component {
    render() {
        return (
            <div>
                <h1>Калькулятор LED экранов</h1>
                <img src={logo} alt="" className={"logo"}/>
            </div>
        );
    }
}

export default Header;
