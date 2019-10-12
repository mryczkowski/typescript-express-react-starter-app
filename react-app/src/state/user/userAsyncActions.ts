import axios from 'axios';

import { getCookie } from '../../util/storage';
import * as actions from './userActions';
import * as client from './userClient';

export const registerUser = (email: string, password: string) => dispatch => {
    dispatch(actions.registeringUser());

    client.registerUser(email, password).then(user => {
        dispatch(actions.registeredUser(user));
    }).catch(err => {
        dispatch(actions.registerUserFailed(err));
    });
}

export const getCurrentUser = () => dispatch => {
    dispatch(actions.fetchingCurrentUser());

    client.getCurrentUser().then(user => {
        dispatch(actions.fetchedCurrentUser(user));
    }).catch(err => {
        dispatch(actions.fetchCurrentUserFailed(err));
    });
}

export const login = (email: string, password: string) => dispatch => {
    dispatch(actions.loggingIn());

    client.login(email, password).then(() => {
        // Must reset default csrf header since it would have changed here
        axios.defaults.headers['x-csrf-token'] = getCookie('my_app.csrf_token');

        dispatch(actions.loggedIn());
    }).catch(err => {
        dispatch(actions.loginFailed(err));
    });
}

export const logout = () => dispatch => {
    dispatch(actions.loggingOut());

    client.logout().then(() => {
        axios.defaults.headers['x-csrf-token'] = '';

        dispatch(actions.loggedOut());
    }).catch(err => {
        dispatch(actions.logoutFailed(err));
    });
}