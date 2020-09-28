import { ADD_TRANSACTION, ADD_EXPENSE_TAG, DEDUCT_FROM_ACCOUNT, ADD_TO_ACCOUNT, OPEN_TRANSACTION_MODAL, LOADING, CLOSE_TRANSACTION_MODAL, RESET_LOADING, SET_SELECTED_TAGS, SET_ACTIVE_FORM, ADD_INCOME_TAG } from "./types";
import { reset } from "redux-form";
import Utility from "../Utility";

export const addExpense = (formValues) => async (dispatch) => {
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
        deductFromAccount(dispatch, formValues.from, formValues.amount)

        //will be replaced by some logger service
        console.info("Expense added successfully");
        dispatch(reset('expenseForm'));
    } catch (e) {
        console.error("Error Occurred while adding expense: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}

export const addIncome = (formValues) => async (dispatch) => {
    try {
        dispatch(loading()); //initiating loading
        dispatch({
            type: ADD_TRANSACTION,
            payload: {
                to: formValues.to,
                date: formValues.date,
                from: null,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        addToAccount(dispatch, formValues.to, formValues.amount);

        //will be replaced by some logger service
        console.info("Income added successfully");
        dispatch(reset('incomeForm'));
    } catch (e) {
        console.error("Error Occurred while adding income: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}

export const addTransfer = (formValues) => async (dispatch) => {
    try {
        dispatch(loading()); //initiating loading
        dispatch({
            type: ADD_TRANSACTION,
            payload: {
                to: formValues.to,
                date: formValues.date,
                from: formValues.to,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        addToAccount(dispatch, formValues.to, formValues.amount);
        deductFromAccount(dispatch, formValues.from, formValues.amount)

        //will be replaced by some logger service
        console.info("Transfer added successfully");
        dispatch(reset('transferForm'));
    } catch (e) {
        console.error("Error Occurred while adding transfer: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}

const addToAccount = (dispatch, id, amount) => {
    dispatch({
        type: ADD_TO_ACCOUNT,
        payload: {
            id: Number(id),
            amount: Number(amount)
        }
    });
}

const deductFromAccount = (dispatch, id, amount) => {
    dispatch({
        type: DEDUCT_FROM_ACCOUNT,
        payload: {
            id: Number(id),
            amount: Number(amount)
        }
    });
}


export const setSelectedTags = tags => async (dispatch) => {
    console.log("setting tags");
    console.log(tags);
    dispatch({
        type: SET_SELECTED_TAGS,
        payload: tags
    });
}

export const setActiveForm = form => async (dispatch) => {
    dispatch({
        type: SET_ACTIVE_FORM,
        payload: form
    });
}

export const addExpenseTag = tag => async (dispatch) => {
    console.log(tag);
    const formattedTag = Utility.capitalizeEveryFirstChar(tag.label);
    console.log("formatted tag", formattedTag)
    dispatch({
        type: ADD_EXPENSE_TAG,
        payload: {
            value: formattedTag,
            label: formattedTag
        }
    });
}
export const addIncomeTag = tag => async (dispatch) => {
    const formattedTag = Utility.capitalizeEveryFirstChar(tag.label);
    dispatch({
        type: ADD_INCOME_TAG,
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