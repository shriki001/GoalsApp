import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button, CssBaseline, TextField, Link, Grid, Container } from '@material-ui/core';
import { ChangeAuth, AuthLogin, ResetLogin, CreateUser } from '../store/actions/authAction';

/**
 * Cart componenet handle the client cart and popup the picker modal according to the event type
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    componentDidMount() {
        const { history, ChangeAuth } = this.props;
        const token = localStorage.getItem('jwt');
        if (token) {
            ChangeAuth();
            const { id, exp } = jwt.decode(token);
            if (exp * 1000 >= new Date().getTime() && Object.keys(id).length) {
                history.push('/goals');
                return <Redirect to="/goals" />;
            }
        }
    }

    validateForm() {
        const { name, password } = this.state;
        return name.length > 0 && password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.AuthLogin(this.state);
        this.setState({ name: '', password: '' });
    }

    createUser = _ => {
        const { name, password } = this.state;
        const { CreateUser } = this.props;
        if (!name.length)
            return window.alert("Provide name first!");
        CreateUser({ name, password });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    render() {
        const { name, password } = this.state;
        const { auth } = this.props;
        if (auth)
            return <Redirect to="/goals" />
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div style={{ position: 'absolute', top: '25%' }}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={this.handleChange}
                            id="name"
                            label="User Name"
                            name="name"
                            value={name}
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={this.handleChange}
                            name="password"
                            value={password}
                            label="Password"
                            type={'password'}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            style={{ margin: '20px auto' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!this.validateForm()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs onClick={this.createUser}>
                                <Link href="#" variant="body2">
                                    Create User
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
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
        AuthLogin: (data) => dispatch(AuthLogin(data)),
        ResetLogin: () => dispatch(ResetLogin()),
        CreateUser: (payload) => dispatch(CreateUser(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);