import React from "react";
import InvalidFeedback from './InvalidFeedback';

const Text = ({ input, label, placeholder, required, hasLabel = true, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-control ${isInvalid ? 'is-invalid' : ''}`;

    const renderLabel = hasLabel ? <label className="form-label" htmlFor={input.name}>{label}{(required) ? <span className="text-danger">*</span> : ""}</label> : "";
    return (
        <div className="form-group">
            {renderLabel}
            <input className={inputClass} placeholder={placeholder} id={input.name} type="text"
                {...input}
            />
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default Text;
