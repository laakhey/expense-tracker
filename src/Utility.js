
const isEmpty = function (value) {
    return !value || value.length === 0;
};

const updateObject = (oldObject, updatedValue) => {
    return {
        ...oldObject,
        ...updatedValue
    }
};

export default {
    isEmpty,
    updateObject
};

