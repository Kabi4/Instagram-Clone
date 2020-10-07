import React, { Component } from 'react';
import Logo from '../../Components/Logo/Logo';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Logo classNaam="header__logo"/>
            </div>
        )
    }
};

export default Header;