import {SIGN_IN, SIGN_OUT} from "../actions/types";
import Utility from "../Utility";

const INITIAL_STATE = {
    isSignedIn: null,
    id: null,
    userId: null,
    userEmail: null,
    userName: null,
    userPictureUrl: null

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return Utility.updateObject(state, {
                isSignedIn: true,
                id: action.payload.id,
                userId: action.payload.userId,
                userEmail: action.payload.userEmail,
                userName: action.payload.userName,
                userPictureUrl: action.payload.userPictureUrl
            });
        case SIGN_OUT:
            return Utility.updateObject(state, {
                isSignedIn: false,
                id: null,
                userId: null,
                userEmail: null,
                userName: null,
                userPictureUrl: null
            });
        default:
            return state;
    }
};
