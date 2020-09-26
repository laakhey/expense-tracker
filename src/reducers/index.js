import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import { reducer as formReducer } from "redux-form";
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    account: accountReducer,
    form: formReducer,
    notification: NotificationReducer,
});
