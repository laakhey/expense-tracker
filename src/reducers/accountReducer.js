import { ADD, EDIT, DELETE, LOADING, RESET, RESET_LOADING, CLOSE_MODAL, OPEN_MODAL } from "../actions/types";
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

const INITIAL_STATE = {
    list: (localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : defaultAccountList,
    loading: false,
    openModal: false,
    counter: (localStorage.getItem("counter")) ? Number(localStorage.getItem("counter")) : 20,
    addAccount: true,
    groups: ["Cash", "Bank", "Asset", "Credit", "Deposit"]

};

const updateAccountList = function (state, payload) {
    const newState = { ...state };
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

        case DELETE:
            return Utility.updateObject(state, {
                list: action.payload.list
            });
        case RESET:
            return Utility.updateObject(state, INITIAL_STATE);
        case LOADING:
            return Utility.updateObject(state, { loading: true });
        case RESET_LOADING:
            return Utility.updateObject(state, { loading: false });
        case OPEN_MODAL:
            return Utility.updateObject(state, { openModal: true, addAccount: action.payload === "add" ? true : false });
        case CLOSE_MODAL:
            return Utility.updateObject(state, { openModal: false });
        default:
            return state;
    }
};
