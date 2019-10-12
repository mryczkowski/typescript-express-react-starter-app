import { combineReducers } from 'redux';
import userReducer from './user/userReducer';

const appReducer = combineReducers({
    user: userReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;

