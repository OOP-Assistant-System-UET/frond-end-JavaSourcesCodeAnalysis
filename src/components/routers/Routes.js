import Home from '../home/Home';
import NotFound from '../home/NotFound';
import React from 'react';
import UMLDiagram from "../classDiagram/UMLDiagram";



const Routes = [
    {
        path:'/',
        exact: true,
        main:() => <Home/>
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