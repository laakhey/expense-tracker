import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import AccountReducer from "./AccountReducer";
import NotificationReducer from './NotificationReducer';
import TransactionReducer from './TransactionReducer';
import CommonReducer from "./CommonReducer";

export default combineReducers({
    account: AccountReducer,
    transaction: TransactionReducer,
    form: formReducer,
    notification: NotificationReducer,
    commons: CommonReducer
});
