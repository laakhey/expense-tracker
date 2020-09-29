import {
    ADD,
    EDIT,
    DELETE,
    LOADING,
    RESET,
    RESET_LOADING,
    CLOSE_MODAL,
    OPEN_MODAL,
    DEDUCT_FROM_ACCOUNT,
    ADD_TO_ACCOUNT
} from "../actions/types";
import Utility from "../Utility";

//later will be added to some constant file.
const defaultAccountList = [
    {
        id: 2,
        name: "Alice's Wallet",
        amount: 10000,
        showOnDashboard: true,
        group: "Cash"
    },
    {
        id: 3,
        name: "Bob's Wallet",
        amount: 5000,
        showOnDashboard: true,
        group: "Cash"
    },
    {
        id: 10,
        name: "Car Loan",
        amount: -15000,
        showOnDashboard: false,
        group: "Credit"
    }, {
        id: 11,
        name: "MasterCard",
        amount: 0,
        showOnDashboard: true,
        group: "Credit"
    }, {
        id: 12,
        name: "VisaCard",
        amount: 1000,
        showOnDashboard: true,
        group: "Credit"
    },
    {
        id: 5,
        name: "Car",
        amount: 20000,
        showOnDashboard: false,
        group: "Asset"
    },
    {
        id: 7,
        name: "Checking",
        amount: 15000,
        showOnDashboard: true,
        group: "Bank"
    }, {
        id: 8,
        name: "Saving",
        amount: 25000,
        showOnDashboard: true,
        group: "Bank"
    }
];

//account reducer initial data
const INITIAL_STATE = {
    list: (localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : defaultAccountList,
    counter: (localStorage.getItem("counter")) ? Number(localStorage.getItem("counter")) : 20,
    addAccount: true,
    groups: [
        {id: 1, name: "Cash"},
        {id: 2, name: "Bank"},
        {id: 3, name: "Asset"},
        {id: 4, name: "Credit"},
        {id: 5, name: "Deposit"}
    ]

};

//deducting amount from account
const deductAmount = (state, payload) => {
    state.list.filter(obj => obj.id === Number(payload.id)).map(obj => {
        obj.amount = obj.amount - payload.amount
        return obj;
    });
    return state.list;
}

//adding amount to account
const addAmount = (state, payload) => {
    state.list.filter(obj => obj.id === Number(payload.id)).map(obj => {
        obj.amount = obj.amount + payload.amount
        return obj;
    });
    return state.list;
}

//for updating the account in array
const updateAccountList = function (state, payload) {
    const newState = {...state};
    newState.list.filter(account => account.id === Number(payload.id)).map(account => {
        account.name = payload.name;
        account.group = payload.group;
        account.showOnDashboard = payload.showOnDashboard;
        account.amount = payload.amount;
        return account;
    });
    return newState.list;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD:
            const newCounter = state.counter + 1;
            action.payload.id = newCounter;
            const newList = state.list.concat(action.payload);
            localStorage.setItem("list", JSON.stringify(newList));
            localStorage.setItem("counter", JSON.stringify(newCounter));
            return Utility.updateObject(state, {
                list: newList,
                counter: newCounter
            });
        case EDIT:
            const updatedList = updateAccountList(state, action.payload);
            localStorage.setItem("list", JSON.stringify(updatedList));
            return Utility.updateObject(state, {
                list: updatedList
            });
        case DEDUCT_FROM_ACCOUNT:
            const updatedDeductedList = deductAmount(state, action.payload);
            localStorage.setItem("list", JSON.stringify(updatedDeductedList));
            return Utility.updateObject(state, {
                list: updatedDeductedList
            });
        case ADD_TO_ACCOUNT:
            const updatedAddedList = addAmount(state, action.payload);
            localStorage.setItem("list", JSON.stringify(updatedAddedList));
            return Utility.updateObject(state, {
                list: updatedAddedList
            });

        case DELETE:
            return Utility.updateObject(state, {
                list: action.payload.list
            });
        case RESET:
            return Utility.updateObject(state, INITIAL_STATE);
        case LOADING:
            return Utility.updateObject(state, {loading: true});
        case RESET_LOADING:
            return Utility.updateObject(state, {loading: false});
        case OPEN_MODAL:
            return Utility.updateObject(state, {openModal: true, addAccount: action.payload === "add"});
        case CLOSE_MODAL:
            return Utility.updateObject(state, {openModal: false});
        default:
            return state;
    }
};
