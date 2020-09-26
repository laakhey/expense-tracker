import { ADD, CLOSE_MODAL, LOADING, OPEN_MODAL, RESET_LOADING } from "./types";
// import play from "../api/play";
import { reset } from "redux-form";
import { success, error } from "../actions"
// import {logger} from "../logger";

// export const signIn = (userId, email, name, pictureUrl) => async (dispatch) => {
//     // logger.info("verifying user login");
//     const response = await play.post('/login', {
//         email,
//         name,
//         pictureUrl
//     });

//     dispatch({
//         type: ADD,
//         payload: {
//             id: response.data.id,
//             userId: userId,
//             userEmail: email,
//             userName: name,
//             userPictureUrl: pictureUrl || null
//         },
//     });
// };

export const addAccount = formValues => async (dispatch) => {

    console.log("add account action: ", formValues);
    try {
        dispatch(loading()); //initiating loading
        if (!formValues.amount) {
            formValues.amount = 0;
        }
        dispatch({
            type: ADD,
            payload: {
                name: formValues.name,
                accountGroupId: formValues.accountGroup,
                showOnDashboard: formValues.showOnDashboard || true,
                amount: formValues.amount
            }
        });
        console.log("success");
        dispatch(success("Account added successfully."));
        console.log("success after");
    } catch (e) {
        dispatch(error("Error Occurred while adding account."+ e));
    } finally {
        dispatch(reset('accountForm')); 
        dispatch(resetLoading()); //terminating loading
    }
}


export const loading = () => {
    return {
        type: LOADING
    }
};
export const openModal = () => {
    return {
        type: OPEN_MODAL
    }
};
export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
};

export const resetLoading = () => {
    return {
        type: RESET_LOADING
    }
};