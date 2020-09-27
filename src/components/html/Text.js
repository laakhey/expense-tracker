import React from "react";
import InvalidFeedback from './InvalidFeedback';

const Text = ({ input, label, placeholder, required, hasLabel = true, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-control ${isInvalid ? 'is-invalid' : ''}`;

    const renderlabel = hasLabel ? <label className="form-label" htmlFor={input.name}>{label}{(required) ? <span className="text-danger">*</span> : ""}</label> : "";
    return (
        <div className="form-group">
            {renderlabel}
            <input className={inputClass} placeholder={placeholder} id={input.name} type="text"
                {...input}
            />
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default Text;
