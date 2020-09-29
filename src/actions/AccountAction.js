import {ADD, ADD_TO_ACCOUNT, DEDUCT_FROM_ACCOUNT, EDIT} from "./types";
import {reset, change} from "redux-form";
import {success, error} from "./NotificationAction";
import {loading, resetLoading, closeModal} from "./CommonAction";

export const addAccount = formValues => async (dispatch) => {
    try {
        dispatch(loading()); //initiating loading
        if (!formValues.amount) {
            formValues.amount = 0;
        }
        dispatch({
            type: formValues.id ? EDIT : ADD,
            payload: {
                id: formValues.id,
                name: formValues.name,
                group: formValues.accountGroup,
                showOnDashboard: (formValues.showOnDashboard === undefined) ? true : formValues.showOnDashboard,
                amount: formValues.amount
            }
        });
        dispatch(success("Account added successfully."));
        //will be replaced by some logger service
        console.info("Account added successfully");
        dispatch(reset('accountForm'));
        dispatch(closeModal());
    } catch (e) {
        console.error("Error Occurred while adding account: ", e)
        dispatch(error("Error Occurred while adding account: " + e));
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}


export const fillAccountForm = account => async (dispatch) => {
    dispatch(change("accountForm", "id", account.id));
    dispatch(change("accountForm", "name", account.name));
    dispatch(change("accountForm", "accountGroup", account.group));
    dispatch(change("accountForm", "showOnDashboard", account.showOnDashboard));
    dispatch(change("accountForm", "amount", account.amount));
}


export const addToAccount = (id, amount) => {
    return {
        type: ADD_TO_ACCOUNT,
        payload: {
            id: Number(id),
            amount: Number(amount)
        }
    };
}

export const deductFromAccount = (id, amount) => {
    return {
        type: DEDUCT_FROM_ACCOUNT,
        payload: {
            id: Number(id),
            amount: Number(amount)
        }
    };
}
