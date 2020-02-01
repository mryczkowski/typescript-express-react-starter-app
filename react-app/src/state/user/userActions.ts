import axios from 'axios';

import { User } from './userModel';
import { ReqError } from '../../typings/request';
import { makeAction } from '../actionHelper';
import { getCookie } from '../../util/storage';
import * as types from './userActionTypes';
import * as client from './userClient';

export const fetchCurrentUserRequest = () => makeAction(types.FETCH_CURRENT_USER_REQUEST);
export const fetchCurrentUserSuccess = (user: User) => makeAction(types.FETCH_CURRENT_USER_SUCCESS, { user });
export const fetchCurrentUserFailure = (error: ReqError) => makeAction(types.FETCH_CURRENT_USER_FAILURE, { error });

export const loginRequest = () => makeAction(types.LOGIN_REQUEST);
export const loginSuccess = () => makeAction(types.LOGIN_SUCCESS);
export const loginFailure = (error: ReqError) => makeAction(types.LOGIN_FAILURE, { error });

export const logoutRequest = () => makeAction(types.LOGOUT_REQUEST);
export const logoutSuccess = () => makeAction(types.LOGOUT_SUCCESS);
export const logoutFailure = (error: ReqError) => makeAction(types.LOGOUT_FAILURE, { error });

export const registerUserRequest = () => makeAction(types.REGISTER_USER_REQUEST)
export const registerUserSuccess = (user: User) => makeAction(types.REGISTER_USER_SUCCESS, { user });
export const registerUserFailure = (error: ReqError) => makeAction(types.REGISTER_USER_FAILURE, { error });

export const registerUser = (email: string, password: string) => dispatch => {
    dispatch(registerUserRequest());

    return client.registerUser(email, password).then(user => {
        dispatch(registerUserSuccess(user));
    }).catch(err => {
        dispatch(registerUserFailure(err));
    });
}

export const getCurrentUser = () => dispatch => {
    dispatch(fetchCurrentUserRequest());

    return client.getCurrentUser().then(user => {
        dispatch(fetchCurrentUserSuccess(user));
    }).catch(err => {
        dispatch(fetchCurrentUserFailure(err));
    });
}

export const login = (email: string, password: string) => dispatch => {
    dispatch(loginRequest());

    return client.login(email, password).then(() => {
        // Must reset default csrf header since it would have changed here
        axios.defaults.headers['x-csrf-token'] = getCookie('my_app.csrf_token');

        dispatch(loginSuccess());
    }).catch(err => {
        dispatch(loginFailure(err));
    });
}

export const logout = () => dispatch => {
    dispatch(logoutRequest());

    return client.logout().then(() => {
        axios.defaults.headers['x-csrf-token'] = '';

        dispatch(logoutSuccess());
    }).catch(err => {
        dispatch(logoutFailure(err));
    });
}

export type UserActionTypes = 
    ReturnType<typeof fetchCurrentUserRequest> | 
    ReturnType<typeof fetchCurrentUserSuccess> |
    ReturnType<typeof fetchCurrentUserFailure> |
    ReturnType<typeof loginRequest> |
    ReturnType<typeof loginSuccess> |
    ReturnType<typeof loginFailure> |
    ReturnType<typeof logoutRequest> |
    ReturnType<typeof logoutSuccess> |
    ReturnType<typeof logoutFailure> |
    ReturnType<typeof registerUserRequest> |
    ReturnType<typeof registerUserSuccess> |
    ReturnType<typeof registerUserFailure>;