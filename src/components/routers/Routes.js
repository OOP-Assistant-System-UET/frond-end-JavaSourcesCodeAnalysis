import Home from '../home/Home';
import History from '../home/History';
import NotFound from '../home/NotFound';
import Account from '../home/Account';
import React from 'react';
import UMLDiagram from "../classDiagram/UMLDiagram";

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
        path:'',
        exact: false,
        main:() => <NotFound/>
    }

];
export default Routes;