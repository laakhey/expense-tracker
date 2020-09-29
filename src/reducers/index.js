import {combineReducers} from "redux";
import AccountReducer from "./AccountReducer";
import {reducer as formReducer} from "redux-form";
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
