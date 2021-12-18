import axios from 'axios';
import { ClearRetailers, GetRetailers } from './retailersAction';

export const ChangeAuth = _ => async dispatch =>
    new Promise(async resolve => {
        try {
            const res = await axios.get(`/auth/checkAuth/`);
            const { data, status } = res;
            if (status === 200) {
                dispatch(GetRetailers());
                resolve(dispatch({ type: 'CHANGE_AUTH', auth: true, user: data }));
            }
        } catch (e) {
            localStorage.removeItem('jwt');
            resolve(dispatch({ type: 'CHANGE_AUTH', auth: false, user: null }));
        }

    })

export const AuthLogin = data => async dispatch => {
    axios.post('/auth/login', data).then(res => {
        const { status, data } = res;
        if (status === 200 && data.user && Object.keys(data.user).length > 0) {
            localStorage.setItem('jwt', data.jwt);
            dispatch(GetRetailers());
            dispatch({ type: 'CHANGE_AUTH', auth: true, user: data.user });
        }
        else dispatch({ type: 'CHANGE_AUTH', auth: false, user: null, login_error: true });
    }).catch(e => dispatch({ type: 'CHANGE_AUTH', auth: false, user: null, login_error: true }));
}

export const ResetLogin = _ => dispatch => dispatch({ type: 'RESET_AUTH' });

export const AuthLogout = _ => async dispatch => {
    dispatch(ClearRetailers());
    localStorage.removeItem('jwt');
    axios.get('/auth/logout').then(res => {
        dispatch({ type: 'RESET_AUTH' });
    }).catch(e => dispatch({ type: 'RESET_AUTH' }));
}