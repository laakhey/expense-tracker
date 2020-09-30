import {
    ADD_TRANSACTION,
    ADD_EXPENSE_TAG,
    SET_SELECTED_TAGS,
    SET_ACTIVE_FORM,
    ADD_INCOME_TAG,
    SET_EXPENSE_TAGS,
    SET_INCOME_TAGS,
    CLEAR_SELECTED_TAGS,
    UPDATE_TRANSACTION
} from "./types";
import {change, reset} from "redux-form";
import Utility from "../Utility";
import {closeModal, loading, resetLoading} from "./CommonAction";
import {addToAccount, deductFromAccount} from "./AccountAction";

//for reverting expense amount
const revertExpenseAmount = (dispatch, formValues, transactionList) => {
    console.info(`reverting expense amount with account id:${formValues.id} and amount ${formValues.amount}`);
    const getCurrentTransaction = transactionList.filter(d => Number(d.id) === Number(formValues.id))[0];
    if (Number(getCurrentTransaction.amount) !== Number(formValues.amount) || getCurrentTransaction.from !== formValues.from) {
        dispatch(addToAccount(getCurrentTransaction.from, getCurrentTransaction.amount));
    }
}
//for reverting income amount
const revertIncomeAmount = (dispatch, formValues, transactionList) => {
    const getCurrentTransaction = transactionList.filter(d => Number(d.id) === Number(formValues.id))[0];
    if (Number(getCurrentTransaction.amount) !== Number(formValues.amount) || getCurrentTransaction.to !== formValues.to) {
        dispatch(deductFromAccount(getCurrentTransaction.to, getCurrentTransaction.amount));
    }
}

//for reverting transfer amount
const revertTransferAmount = (dispatch, formValues, transactionList) => {
    const getCurrentTransaction = transactionList.filter(d => Number(d.id) === Number(formValues.id))[0];
    if (Number(getCurrentTransaction.amount) !== Number(formValues.amount) || getCurrentTransaction.from !== formValues.from || getCurrentTransaction.to !== formValues.to) {
        dispatch(addToAccount(getCurrentTransaction.from, getCurrentTransaction.amount));
        dispatch(deductFromAccount(getCurrentTransaction.to, getCurrentTransaction.amount));
    }
}

export const addExpense = (formValues) => async (dispatch, getState) => {
    try {
        dispatch(loading()); //initiating loading
        let type;
        if (formValues.id) {
            console.info("updating account amount");
            type = UPDATE_TRANSACTION
            const transactionList = getState().transaction.list;
            revertExpenseAmount(dispatch, formValues, transactionList);
        } else {
            console.info("adding account amount");
            type = ADD_TRANSACTION
        }
        dispatch({
            type: type,
            payload: {
                id: formValues.id,
                from: formValues.from,
                date: formValues.date,
                to: null,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        dispatch(deductFromAccount(formValues.from, formValues.amount));

        //will be replaced by some logger service
        console.info("Expense added successfully");
        dispatch(reset('expenseForm'));
        dispatch(closeModal());
    } catch (e) {
        console.error("Error Occurred while adding expense: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}

export const addIncome = (formValues) => async (dispatch, getState) => {
    try {
        dispatch(loading()); //initiating loading
        let type;
        if (formValues.id) {
            type = UPDATE_TRANSACTION;
            const transactionList = getState().transaction.list;
            revertIncomeAmount(dispatch, formValues, transactionList);
        } else {
            type = ADD_TRANSACTION
        }
        dispatch({
            type: type,
            payload: {
                id: formValues.id,
                to: formValues.to,
                date: formValues.date,
                from: null,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        dispatch(addToAccount(formValues.to, formValues.amount));

        //will be replaced by some logger service
        console.info("Income added successfully");
        dispatch(reset('incomeForm'));
        dispatch(closeModal());
        dispatch(_setActiveForm("expenseForm"));
    } catch (e) {
        console.error("Error Occurred while adding income: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}

export const addTransfer = (formValues) => async (dispatch, getState) => {
    try {
        dispatch(loading()); //initiating loading
        let type;
        if (formValues.id) {
            type = UPDATE_TRANSACTION;
            const transactionList = getState().transaction.list;
            revertTransferAmount(dispatch, formValues, transactionList);
        } else {
            type = ADD_TRANSACTION
        }
        dispatch({
            type: type,
            payload: {
                id: formValues.id,
                to: formValues.to,
                date: formValues.date,
                from: formValues.from,
                amount: formValues.amount,
                note: formValues.note
            }
        });
        dispatch(addToAccount(formValues.to, formValues.amount));
        dispatch(deductFromAccount(formValues.from, formValues.amount));

        //will be replaced by some logger service
        console.info("Transfer added successfully");
        dispatch(reset('transferForm'));
        dispatch(closeModal());
        dispatch(_setActiveForm("expenseForm"));
    } catch (e) {
        console.error("Error Occurred while adding transfer: ", e)
    } finally {
        dispatch(resetLoading()); //terminating loading
    }
}


export const setSelectedTags = tags => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_TAGS,
        payload: tags
    });
}

export const setActiveForm = form => async (dispatch) => {
    dispatch(_setActiveForm(form));
}

export const _setActiveForm = form => {
    return {
        type: SET_ACTIVE_FORM,
        payload: form
    };
}

export const clearSelectedTags = () => async (dispatch) => {
    dispatch({
        type: CLEAR_SELECTED_TAGS,
        payload: []
    });
}

export const addExpenseTag = tag => async (dispatch) => {
    const formattedTag = Utility.capitalizeEveryFirstChar(tag.label);
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

export const fillExpenseForm = transaction => async (dispatch) => {
    dispatch(change("expenseForm", "id", transaction.id));
    dispatch(change("expenseForm", "from", transaction.from));
    dispatch(change("expenseForm", "tags", transaction.tags));
    dispatch(change("expenseForm", "note", transaction.note));
    dispatch(change("expenseForm", "amount", transaction.amount));
    dispatch(change("expenseForm", "date", transaction.date));
    dispatch({
        type: SET_EXPENSE_TAGS,
        payload: transaction.tags
    })
}
export const fillIncomeForm = transaction => async (dispatch) => {
    dispatch(change("incomeForm", "id", transaction.id));
    dispatch(change("incomeForm", "to", transaction.to));
    dispatch(change("incomeForm", "tags", transaction.tags));
    dispatch(change("incomeForm", "note", transaction.note));
    dispatch(change("incomeForm", "amount", transaction.amount));
    dispatch(change("incomeForm", "date", transaction.date));
    dispatch({
        type: SET_INCOME_TAGS,
        payload: transaction.tags
    })
}
export const fillTransferForm = transaction => async (dispatch) => {
    dispatch(change("transferForm", "id", transaction.id));
    dispatch(change("transferForm", "from", transaction.from));
    dispatch(change("transferForm", "to", transaction.to));
    dispatch(change("transferForm", "note", transaction.note));
    dispatch(change("transferForm", "amount", transaction.amount));
    dispatch(change("transferForm", "date", transaction.date));
}