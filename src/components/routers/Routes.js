import Home from '../home/Home';
import History from '../home/History';
import NotFound from '../home/NotFound';
import Account from '../home/Account';
import React from 'react';
import UMLDiagram from "../classDiagram/UMLDiagram";
import Login from "../log_in_out/Login";
import Logout from "../log_in_out/Logout";



const Routes = [
    {
        path:'/',
        exact: true,
        main:() => <Home/>
    },
    {
        path:'/history',
        exact: false,
        main:() => <History/>
    },
    {
        path:'/my_account',
        exact: false,
        main:() => <Account/>
    },
    {
        path:'/classdiagram',
        exact: false,
        main:() => <UMLDiagram/>
    },
    {
        path:'/login',
        exact: false,
        main:() => <Login/>
    },
    {
        path:'/logout',
        exact: false,
        main:() => <Logout/>
    },

    {
        path:'',
        exact: false,
        main:() => <NotFound/>
    }

];
export default Routes;