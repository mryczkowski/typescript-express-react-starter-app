import * as actions from './userActions';
import { getCookie } from '../../util/storage';
import { ReqStatus, ReqError } from '../../typings/request';
import { User } from './userModel';

interface UserState {
    currentUser?: User;
    fetchCurrentUserReqStatus: ReqStatus;
    signUpReqStatus: ReqStatus;
    loginReqStatus: ReqStatus;
    logoutReqStatus: ReqStatus;
    loggedIn: boolean;

    error: ReqError;
}

const initialState: UserState = {
    fetchCurrentUserReqStatus: '',
    signUpReqStatus: '',
    loginReqStatus: '',
    logoutReqStatus: '',
    loggedIn: !!getCookie('my_app.has_session'),

    error: {
        validationErrors: {},
        message: '',
    }
};

export default function userReducer(state = initialState, action): UserState {
    switch (action.type) {
        case actions.FETCHING_CURRENT_USER:
            return {
                ...state,
                fetchCurrentUserReqStatus: 'pending',
            };
        case actions.FETCHED_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                fetchCurrentUserReqStatus: 'success',
            };
        case actions.FETCH_CURRENT_USER_FAILED:
            return {
                ...state,
                fetchCurrentUserReqStatus: 'error',
            };
        case actions.LOGGING_OUT: {
            return {
                ...state,
                logoutReqStatus: 'pending',
            };
        }
        case actions.LOGGED_OUT: {
            return {
                ...state,
                logoutReqStatus: 'success',
                loggedIn: false,
                currentUser: initialState.currentUser,
            };
        }
        case actions.LOGOUT_FAILED: {
            return {
                ...state,
                logoutReqStatus: 'error',
            };
        }
        case actions.LOGGING_IN:
            return {
                ...state,
                loginReqStatus: 'pending',
            };
        case actions.LOGGED_IN:
            return {
                ...state,
                loginReqStatus: 'success',
                loggedIn: true,
            };
        case actions.LOGIN_FAILED:
            return {
                ...state,
                loginReqStatus: 'error',
                loggedIn: false,
                error: action.error,
            };
        case actions.REGISTERING_USER:
            return {
                ...state,
                signUpReqStatus: 'pending',
            };
        case actions.REGISTERED_USER:
            return {
                ...state,
                signUpReqStatus: 'success',
                currentUser: action.user,
            };
        case actions.REGISTER_USER_FAILED:
            return {
                ...state,
                signUpReqStatus: 'error',
                error: action.error,
            };
        default: return state;
    }
}
