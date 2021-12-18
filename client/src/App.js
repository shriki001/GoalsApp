import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import GoalsDetial from './Components/GoalsDetial';
import Home from './Components/Home';
import Login from './Components/Login';

/**
 * main componenet that handle all the app 
 */
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={props => <Login {...props} />} />
                    <Route exact path="/goals/:id" render={props => <GoalsDetial {...props} />} />
                    <Route exact path="/goals" render={props => <Home {...props} />} />
                </Switch>
            </Router >
        );
    }
}

export default App;
