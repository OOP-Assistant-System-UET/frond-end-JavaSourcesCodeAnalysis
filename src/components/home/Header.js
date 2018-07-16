import React, { Component } from 'react';
import '../../css/Header.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Redirect,
    withRouter
} from 'react-router-dom';
import Logout from "../log_in_out/Logout";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)
const HeaderLink=({ label, t , activeOnlyWhenExact })=>{
    let to =t;
    if(localStorage.getItem('user')=== null) to="/login";
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
        var loggedInUser = localStorage.getItem('user');
        console.log(loggedInUser);
        return (

            <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand" >Logo</a>
                <div className="collapse navbar-collapse" id="nav-content">
                    <ul className="navbar-nav">
                        <HeaderLink label="Home" t="/" activeOnlyWhenExact={true}/>
                        <HeaderLink label="History" t="/history" activeOnlyWhenExact={false}/>
                        <HeaderLink label="My Account" t="/my_account" activeOnlyWhenExact={false}/>
                        <HeaderLink label="Log out" t="/logout" activeOnlyWhenExact={false}/>
                        <PrivateRoute path='/logout' component={Logout} />
                    </ul>
                </div>
            </nav>


        );
    }
}

export default Header;
