import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import GoalsDetial from './Components/GoalsDetial';
import jwt from 'jsonwebtoken';
import Home from './Components/Home';
import Login from './Components/Login';

function checkAuth(for_user) {
    const token = localStorage.getItem('jwt');
    if (token) {
        const { id, exp } = jwt.decode(token);
        if (exp * 1000 < new Date().getTime())
            return false;
        return for_user ? id && id.permissions && id.permissions.includes(for_user) : id && id.permissions;
    }
}

const SuperProtectedRoute = props => {
    /**
     * route only for super users
     */
    if (checkAuth('super'))
        return <Route {...props} />
    return <Redirect to='/login' />
}

const TeamProtectedRoute = props => {
    /**
    * route only for team or super users
    */
    if (checkAuth('super') || checkAuth('team'))
        return <Route {...props} />
    return <Redirect to='/login' />
}


const ProtectedRoute = props => {
    /**
    * route only for autenticated users
    */
    if (checkAuth())
        return <Route {...props} />
    return <Redirect to='/login' />
}

/**
 * main componenet that handle all the app 
 */
class App extends Component {

    async componentDidMount() {
        // await ChangeAuth();
    }

    render() {
        return (
            <Router>
                <Switch>
                    {/* 
                    <Route exact path="/login/reset/:token" render={props => <Reset {...props} />} />
                    <ProtectedRoute exact path="/shop_report" component={ShopReport} />
                */}
                    <Route exact path="/" render={props => <Login {...props} />} />
                    <Route exact path="/goals/:id" render={props => <GoalsDetial {...props} />} />
                    <Route exact path="/goals" render={props => <Home {...props} />} />
                </Switch>
            </Router >
        );
    }
}

export default App;
