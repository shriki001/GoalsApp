import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { GetRetailers } from './store/actions/retailersAction';
import jwt from 'jsonwebtoken';
import Login from './Components/Login';
import Reset from './Components/Reset'
import Products from './Components/Products';
import Logos from './Components/Logos';
import Promotions from './Components/Promotions';
import Deals from './Components/Deals';
import Instructions from './Components/Instructions';
import Home from './Components/Home';
import Retailers from './Components/Retailers';
import Predefined from './Components/Predefined';
import Users from './Components/Users';
import { ChangeAuth } from './store/actions/authAction';
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import Versions from './Components/Versions';
import Admin from './Components/Admin';
import Pipelines from './Components/Pipelines/Pipelines';
import ShopReport from './Components/ShopReport/ShopReport';
import ShopReportDetail from './Components/ShopReport/ShopReportDetail';

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
        const { ChangeAuth, GetRetailers } = this.props;
        await ChangeAuth();
        GetRetailers();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" render={props => <Login {...props} />} />
                    <Route exact path="/login/reset/:token" render={props => <Reset {...props} />} />
                    <ProtectedRoute exact path="/" render={props => <Login {...props} />} />
                    <ProtectedRoute exact path="/products" component={Products} />
                    <TeamProtectedRoute exact path="/logos" component={Logos} />
                    <ProtectedRoute exact path="/deals" component={Deals} />
                    <TeamProtectedRoute exact path="/promotions" component={Promotions} />
                    <TeamProtectedRoute exact path="/instructions" component={Instructions} />
                    <ProtectedRoute exact path="/home" component={Home} />
                    <ProtectedRoute exact path="/predefined" component={Predefined} />
                    <TeamProtectedRoute exact path="/retailers" component={Retailers} />
                    <TeamProtectedRoute exact path="/admin" component={Admin} />
                    <SuperProtectedRoute exact path="/users" component={Users} />
                    <TeamProtectedRoute exact path="/versions" component={Versions} />
                    <TeamProtectedRoute exact path="/runner" component={Pipelines} />
                    <ProtectedRoute exact path="/shop_report" component={ShopReport} />
                    <ProtectedRoute exact path="/shop_report/:retailer/:id" component={ShopReportDetail} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ChangeAuth: () => dispatch(ChangeAuth()),
        GetRetailers: () => dispatch(GetRetailers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
