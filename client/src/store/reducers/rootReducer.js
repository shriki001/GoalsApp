import authReducer from './authReducer';
import goalsReducer from './goalsReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    goals: goalsReducer
});
export default rootReducer;
