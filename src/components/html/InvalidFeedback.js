import React from "react";

const InvalidFeedback = (props) => {
    const { touched, error } = props.meta;
    if (touched && error) {
        return <div className="invalid-feedback">{error}</div>;
    } else {
        return <div />;
    }
};

export default InvalidFeedback;
