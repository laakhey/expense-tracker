import {SIGN_IN, SIGN_OUT} from "./types";
import play from "../api/play";
// import {logger} from "../logger";

export const signIn = (userId, email, name, pictureUrl) => async (dispatch) => {
    // logger.info("verifying user login");
    const response = await play.post('/login', {
        email,
        name,
        pictureUrl
    });
    dispatch({
        type: SIGN_IN,
        payload: {
            id: response.data.id,
            userId: userId,
            userEmail: email,
            userName: name,
            userPictureUrl: pictureUrl || null
        },
    });
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};
