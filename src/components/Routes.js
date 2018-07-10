import Home from './Home';
import History from './History';
import NotFound from './NotFound';
import Account from './Account';
import React from 'react';
import UMLDiagram from "./classDiagram/UMLDiagram";

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