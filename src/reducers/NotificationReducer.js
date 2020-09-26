import { INFO, RESET, SUCCESS, WARNING, ERROR } from "../actions/types";
import Utility from '../Utility'
import SharedConstant from "../constants/shared-constant";

const INITIAL_STATE = {
    display: false,
    message: null,
    type: null,
    title: null
};

const getNotificationObject = (action, type) => {
    return {
        display: true, type: type, message: action.payload.message, title: action.payload.title
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INFO:
            return Utility.updateObject(state, getNotificationObject(action, SharedConstant.info));
        case SUCCESS:
            return Utility.updateObject(state, getNotificationObject(action, SharedConstant.success));
        case WARNING:
            return Utility.updateObject(state, getNotificationObject(action, SharedConstant.warning));
        case ERROR:
            return Utility.updateObject(state, getNotificationObject(action, SharedConstant.error));
        case RESET:
            return Utility.updateObject(state, INITIAL_STATE);
        default:
            return state;
    }
};
