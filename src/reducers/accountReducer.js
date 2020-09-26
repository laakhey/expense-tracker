import { ADD, DELETE, LOADING, RESET, RESET_LOADING, CLOSE_MODAL, OPEN_MODAL } from "../actions/types";
import Utility from "../Utility";

//later will be added to some constant file.
const defaultAccountList = [
    {
        id: 1,
        name: "Cash",
        accountList: [{
            id: 2,
            name: "Alice's Wallet",
            amount: 10000,
            showOnDashboard: true
        },
        {
            id: 3,
            name: "Bob's Wallet",
            amount: 5000,
            showOnDashboard: true
        }]
    },
    {
        id: 4,
        name: "Asset",
        accountList: [{
            id: 5,
            name: "Car",
            amount: 20000,
            showOnDashboard: false
        }]
    },
    {
        id: 6,
        name: "Bank Account",
        accountList: [{
            id: 7,
            name: "Checking",
            amount: 15000,
            showOnDashboard: true
        }, {
            id: 8,
            name: "Saving",
            amount: 25000,
            showOnDashboard: true
        }]
    },
    {
        id: 9,
        name: "Credit",
        accountList: [{
            id: 10,
            name: "Car Loan",
            amount: -15000,
            showOnDashboard: false
        }, {
            id: 11,
            name: "MasterCard",
            amount: 0,
            showOnDashboard: true
        }, {
            id: 12,
            name: "VisaCard",
            amount: 1000,
            showOnDashboard: true
        }]
    },
    {
        id: 13,
        name: "Deposit",
        accountList: []
    }
];

const INITIAL_STATE = {
    list: (localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : defaultAccountList,
    counter: (localStorage.getItem("counter")) ? Number(localStorage.getItem("counter")) : 13,
    loading: false,
    openModal: false

};

const getNewState = function (newState, payload) {
    const account = {
        id: newState.counter + 1,
        amount: payload.amount,
        name: payload.name,
        showOnDashboard: payload.showOnDashboard
    }
    const accountGroup = newState.list.filter(group => group.id === Number(payload.accountGroupId));
    if (!accountGroup) {
        throw "Invalid account group.";
    }
    accountGroup[0].accountList.push(account);
    return newState.list;

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD:
            const newList = getNewState({ ...state }, action.payload)
            const newCounter = Number(state.counter) + 1
            localStorage.setItem("list", JSON.stringify(newList));
            localStorage.setItem("counter", newCounter);
            state.counter++;
            return Utility.updateObject(state, {
                counter: newCounter,
                list: newList,

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
            return Utility.updateObject(state, { openModal: true });
        case CLOSE_MODAL:
            return Utility.updateObject(state, { openModal: false });
        default:
            return state;
    }
};
