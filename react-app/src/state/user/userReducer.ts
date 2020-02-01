import * as actions from './userActionTypes';
import { UserActionTypes } from './userActions';
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

export default function userReducer(state = initialState, action: UserActionTypes): UserState {
    switch (action.type) {
        case actions.FETCH_CURRENT_USER_REQUEST:
            return {
                ...state,
                fetchCurrentUserReqStatus: 'pending',
            };
        case actions.FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                fetchCurrentUserReqStatus: 'success',
            };
        case actions.FETCH_CURRENT_USER_FAILURE:
            return {
                ...state,
                fetchCurrentUserReqStatus: 'error',
            };
        case actions.LOGOUT_REQUEST: {
            return {
                ...state,
                logoutReqStatus: 'pending',
            };
        }
        case actions.LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutReqStatus: 'success',
                loggedIn: false,
                currentUser: initialState.currentUser,
            };
        }
        case actions.LOGOUT_FAILURE: {
            return {
                ...state,
                logoutReqStatus: 'error',
            };
        }
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                loginReqStatus: 'pending',
            };
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loginReqStatus: 'success',
                loggedIn: true,
            };
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                loginReqStatus: 'error',
                loggedIn: false,
                error: action.payload.error,
            };
        case actions.REGISTER_USER_REQUEST:
            return {
                ...state,
                signUpReqStatus: 'pending',
            };
        case actions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                signUpReqStatus: 'success',
                currentUser: action.payload.user,
            };
        case actions.REGISTER_USER_FAILURE:
            return {
                ...state,
                signUpReqStatus: 'error',
                error: action.payload.error,
            };
        default: return state;
    }
}
