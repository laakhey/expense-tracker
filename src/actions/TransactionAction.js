import { ADD_TRANSACTION, ADD_EXPENSE_TAG, DEDUCT_FROM_ACCOUNT, OPEN_TRANSACTION_MODAL, LOADING, CLOSE_TRANSACTION_MODAL, RESET_LOADING, SET_SELECTED_TAGS } from "./types";
import { reset, change } from "redux-form";
import Utility from "../Utility";

export const addExpense = (formValues) => async (dispatch) => {

    console.log("add account action: ", formValues);
    try {

        dispatch(loading()); //initiating loading
        dispatch({
            type: ADD_TRANSACTION,
            payload: {
                from: formValues.from,
                date: formValues.date,
                to: null,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        dispatch({
            type: DEDUCT_FROM_ACCOUNT,
            payload: {
                id: Number(formValues.from),
                amount: Number(formValues.amount)
            }
        });

        //will be replaced by some logger service
        console.info("Expense added successfully");
        dispatch(reset('expenseForm'));
    } catch (e) {
        console.error("Error Occurred while adding expense: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}


export const setSelectedTags = tags => async (dispatch) => {
    console.log("setting tags");
    console.log(tags);
    dispatch({
        type: SET_SELECTED_TAGS,
        payload: tags
    });
}
export const addExpenseTag = tag => async (dispatch) => {
    console.log(tag);
    const formattedTag = Utility.capitalizeEveryFirstChar(tag.label);
    console.log("formated tag", formattedTag)
    dispatch({
        type: ADD_EXPENSE_TAG,
        payload: {
            value: formattedTag,
            label: formattedTag
        }
    });
}

export const loading = () => {
    return {
        type: LOADING
    }
};
export const openTransactionModal = (formType) => {
    return {
        type: OPEN_TRANSACTION_MODAL,
        payload: formType
    }
};
export const closeTransactionModal = () => {
    return {
        type: CLOSE_TRANSACTION_MODAL
    }
};

export const resetLoading = () => {
    return {
        type: RESET_LOADING
    }
};