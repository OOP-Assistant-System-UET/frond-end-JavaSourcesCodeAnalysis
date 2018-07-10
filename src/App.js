import React, { Component } from 'react';
import Header from './components/Header';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Routes from './components/Routes';


class App extends Component {
  render() {
    return (
        <Router>
            <center>
                <Header/>
                <Switch>
                    {this.showContentMenu(Routes)}
                </Switch>
                <br></br>
            </center>
        </Router>
    );
  }
  showContentMenu = (Routes)=> {
      var result = null;
      if(Routes.length > 0){
          result = Routes.map((route, index)=>{
              return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
              );
          });
      }
      return result;
  }
}

export default App;
