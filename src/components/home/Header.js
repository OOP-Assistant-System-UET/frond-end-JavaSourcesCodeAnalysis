import React, { Component } from 'react';
import '../../css/Header.css';
import {  Route, NavLink } from "react-router-dom";

const HeaderLink=({ label, to, activeOnlyWhenExact })=>{
    return(
        <Route path={to} exact={activeOnlyWhenExact} children={({match})=>{
            return(
                <li className="nav-item">
                    <NavLink to={to} exact={activeOnlyWhenExact} className="nav-link">
                        {label}
                    </NavLink>
                </li>
            )
        }}

        />
    )
}


class Header extends Component {

    render() {
        return (

            <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand" >Logo</a>
                <div className="collapse navbar-collapse" id="nav-content">
                    <ul className="navbar-nav">
                        <HeaderLink label="Home" to="/" activeOnlyWhenExact={true}/>
                        <HeaderLink label="History" to="/history" activeOnlyWhenExact={false}/>
                        <HeaderLink label="My Account" to="/my_account" activeOnlyWhenExact={false}/>
                        <HeaderLink label="Log out" to="/log_out" activeOnlyWhenExact={false}/>
                    </ul>
                </div>
            </nav>


        );
    }
}

export default Header;
