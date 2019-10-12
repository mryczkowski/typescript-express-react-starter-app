import { User } from './userModel';
import { ReqError } from '../../typings/request';

export const FETCHING_CURRENT_USER = 'user/FETCHING_CURRENT_USER';
export const fetchingCurrentUser = () => ({
    type: FETCHING_CURRENT_USER,
});

export const FETCHED_CURRENT_USER = 'user/FETCHED_CURRENT_USER';
export const fetchedCurrentUser = (user: User) => ({
    type: FETCHED_CURRENT_USER,
    user,
});

export const FETCH_CURRENT_USER_FAILED = 'user/FETCH_CURRENT_USER_FAILED';
export const fetchCurrentUserFailed = (error: ReqError) => ({
    type: FETCH_CURRENT_USER_FAILED,
    error,
});

export const LOGGING_IN = 'user/LOGGING_IN';
export const loggingIn = () => ({
    type: LOGGING_IN,
});

export const LOGGED_IN = 'user/LOGGED_IN';
export const loggedIn = () => ({
    type: LOGGED_IN,
});

export const LOGIN_FAILED = 'user/LOGIN_FAILED';
export const loginFailed = (error: ReqError) => ({
    type: LOGIN_FAILED,
    error,
});

export const LOGGING_OUT = 'user/LOGGING_OUT';
export const loggingOut = () => ({
    type: LOGGING_OUT,
});

export const LOGGED_OUT = 'user/LOGGED_OUT';
export const loggedOut = () => ({
    type: LOGGED_OUT,
});

export const LOGOUT_FAILED = 'user/LOGOUT_FAILED';
export const logoutFailed = (error: ReqError) => ({
    type: LOGOUT_FAILED,
    error,
});

export const REGISTERING_USER = 'user/REGISTERING_USER';
export const registeringUser = () => ({
    type: REGISTERING_USER,
});

export const REGISTERED_USER = 'user/REGISTERED_USER';
export const registeredUser = (user: User) => ({
    type: REGISTERED_USER,
    user,
});

export const REGISTER_USER_FAILED = 'user/REGISTER_USER_FAILED';
export const registerUserFailed = (error: ReqError) => ({
    type: REGISTER_USER_FAILED,
    error,
});