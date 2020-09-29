import {CLOSE_MODAL, LOADING, OPEN_MODAL, RESET_LOADING} from "./types";
import {reset} from "redux-form";

export const loading = () => {
    return {
        type: LOADING
    }
};

export const openModal = (formType) => {
    return {
        type: OPEN_MODAL,
        payload: formType
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

export const resetForm = form => async (dispatch) => {
    dispatch(reset(form));
};