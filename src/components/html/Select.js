import React from "react";
import InvalidFeedback from './InvalidFeedback';

const renderAccountGroups = function (options) {
    return options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>);
};
const Select = ({ input, label, options, required, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-select ${isInvalid ? 'is-invalid' : ''}`;

    return (
        <div className="form-group">
            <label htmlFor={input.name} className="form-label" >{label}{(required) ? <span className="text-danger">*</span> : ""}</label>
            <select className={inputClass} id={input.name} {...input}>
                <option value="0"></option>
                {renderAccountGroups(options)}
            </select>
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default Select;
