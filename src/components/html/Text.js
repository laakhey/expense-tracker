import React from "react";
import InvalidFeedback from './InvalidFeedback';

const Text = ({ input, label, required, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-control ${isInvalid ? 'is-invalid' : ''}`;
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={input.name}>{label}{(required) ? <span className="text-danger">*</span> : ""}</label>
            <input className={inputClass} id={input.name} type="text"
                {...input}
            />
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default Text;
