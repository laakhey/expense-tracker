import {ERROR, INFO, RESET, WARNING, SUCCESS} from "./types";

export const info = (message, title) => {
    return {
        type: INFO,
        payload: {
            message: message,
            title: title
        }
    }
};

export const success = (message, title) => {
    return {
        type: SUCCESS,
        payload: {
            message: message,
            title: title
        }
    }
};

export const warning = (message, title) => {
    return {
        type: WARNING,
        payload: {
            message: message,
            title: title
        }
    }
};

export const error = (message, title) => {
    return {
        type: ERROR,
        payload: {
            message: message,
            title: title
        }
    }
};

export const reset = () => {
    return {
        type: RESET
    }
};
