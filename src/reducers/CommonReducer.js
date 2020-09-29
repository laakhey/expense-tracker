import {
    LOADING,
    RESET_COMMONS,
    RESET_LOADING,
    CLOSE_MODAL,
    OPEN_MODAL
} from "../actions/types";
import Utility from "../Utility";

//common reducer initial data
const INITIAL_STATE = {
    loading: false,
    openModal: false,
    add: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_COMMONS:
            return Utility.updateObject(state, INITIAL_STATE);
        case LOADING:
            return Utility.updateObject(state, {loading: true});
        case RESET_LOADING:
            return Utility.updateObject(state, {loading: false});
        case OPEN_MODAL:
            return Utility.updateObject(state, {openModal: true, add: action.payload === "add"});
        case CLOSE_MODAL:
            return Utility.updateObject(state, {openModal: false});
        default:
            return state;
    }
};
