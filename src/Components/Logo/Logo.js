import React from 'react';
import logo from './../../Assets/Logo/Logo.png'

const Logo = (props) => {
    return (
        <img className={props.classNaam} src={logo} alt="logo" />
    )
};

export default Logo;
