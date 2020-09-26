import React from "react";

const CheckBox = ({ input, label, meta }) => {
    return (
        <div className="form-check amount-checkbox-margin-top" >
            <input className="form-check-input" type="checkbox" value="true" defaultChecked id={input.name} {...input} />
            <label className="form-check-label" htmlFor={input.name} > {label} </label>
        </div>
    );
};

export default CheckBox;
