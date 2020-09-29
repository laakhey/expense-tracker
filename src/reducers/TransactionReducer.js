import {
    ADD_TRANSACTION,
    ADD_EXPENSE_TAG,
    ADD_INCOME_TAG,
    SET_SELECTED_TAGS,
    SET_ACTIVE_FORM,
    SET_EXPENSE_TAGS,
    SET_INCOME_TAGS,
    CLEAR_SELECTED_TAGS,
    UPDATE_TRANSACTION
} from "../actions/types";
import Utility from "../Utility";
import _ from 'lodash';

const DEFAULT_EXPENSE_TAG_LIST = [
    {value: "Groceries", label: "Groceries"},
    {value: "Restaurant", label: "Restaurant"},
    {value: "Rent", label: "Rent"},
    {value: "Income Tax", label: "Income Tax"},
    {value: "Utilities", label: "Utilities"},
    {value: "Social Security", label: "Social Security"},
    {value: "Food", label: "Food"},
    {value: "Shopping", label: "Shopping"}
];

const DEFAULT_INCOME_TAG_LIST = [
    {value: "Salary", label: "Salary"},
    {value: "Bonus", label: "Bonus"},
    {value: "EU Consulting", label: "EU Consulting"}
];

const INITIAL_STATE = {
    list: (localStorage.getItem("transactionList")) ? JSON.parse(localStorage.getItem("transactionList")) : [],
    counter: (localStorage.getItem("transactionCounter")) ? Number(localStorage.getItem("transactionCounter")) : 0,
    expenseTags: (localStorage.getItem("expenseTagList")) ? JSON.parse(localStorage.getItem("expenseTagList")) : DEFAULT_EXPENSE_TAG_LIST,
    incomeTags: (localStorage.getItem("incomeTagList")) ? JSON.parse(localStorage.getItem("incomeTagList")) : DEFAULT_INCOME_TAG_LIST,
    selectedExpenseTags: [],
    selectedIncomeTags: [],
    selectedTags: [],
    activeForm: 'expenseForm'
};

const saveToLocalStorage = function (newList, newCounter) {
    localStorage.setItem("transactionList", JSON.stringify(newList));
    localStorage.setItem("transactionCounter", JSON.stringify(newCounter));
}

const createTransaction = function (state, payload) {
    payload.type = state.activeForm;
    payload.id = state.counter + 1;
    payload.tags = state.selectedTags ? state.selectedTags.map(tag => tag.label) : [];
    return payload;
}

const updateTransaction = function (state, payload) {
    const newList = {...state}.list;
    _.remove(newList, function (n) {
        return Number(n.id) === Number(payload.id);
    });
    payload.type = state.activeForm;
    payload.tags = state.selectedTags ? state.selectedTags.map(tag => tag.label) : [];
    return newList.concat(payload);
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            const updatedPayload = createTransaction(state, action.payload);
            const newCounter = updatedPayload.id;
            action.payload.id = newCounter;
            const newList = state.list.concat(updatedPayload);
            saveToLocalStorage(newList, newCounter);
            return Utility.updateObject(state, {
                list: newList,
                counter: newCounter
            });
        case UPDATE_TRANSACTION:
            const newUpdatedList = updateTransaction(state, action.payload);
            localStorage.setItem("transactionList", JSON.stringify(newUpdatedList));
            return Utility.updateObject(state, {
                list: newUpdatedList
            });

        //WTD checking duplicate expense tag
        case ADD_EXPENSE_TAG:
            const newExpenseTagList = state.expenseTags.concat(action.payload);
            localStorage.setItem("expenseTagList", JSON.stringify(newExpenseTagList));
            return Utility.updateObject(state, {
                expenseTags: newExpenseTagList
            });

        //WTD checking duplicate expense tag
        case ADD_INCOME_TAG:
            const newIncomeTagList = state.incomeTags.concat(action.payload);
            localStorage.setItem("incomeTagList", JSON.stringify(newIncomeTagList));
            return Utility.updateObject(state, {
                incomeTags: newIncomeTagList
            });

        case SET_SELECTED_TAGS:
            return Utility.updateObject(state, {
                selectedTags: action.payload
            });

        case SET_EXPENSE_TAGS:
            return Utility.updateObject(state, {
                selectedExpenseTags: action.payload
            });
        case SET_INCOME_TAGS:
            return Utility.updateObject(state, {
                selectedIncomeTags: action.payload
            });
        case SET_ACTIVE_FORM:
            return Utility.updateObject(state, {
                activeForm: action.payload
            });
        case CLEAR_SELECTED_TAGS:
            return Utility.updateObject(state, {
                selectedTags: action.payload,
                selectedExpenseTags: action.payload,
                selectedIncomeTags: action.payload,
            });
        default:
            return state;
    }
};
