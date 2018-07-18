import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './css/App.css';

import Home from './components/home/Home';
import UMLDiagram from './components/classDiagram/UMLDiagram';
class App extends Component {
  state={token: null};
  token=(e)=>{
    this.setState({
        token:e
    });
  }
  render() {

    return (
          <Router>
            <div>
              <Switch>
                <Route path='/' exact render={()=><Home token={this.token}/>}/>
                <Route path='/classdiagram' render={()=><UMLDiagram token={this.state.token}/>}/>
              </Switch>
            </div>
          </Router>
    );
          
  }
}
export default App;
