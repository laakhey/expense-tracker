import React from "react";
import InvalidFeedback from './InvalidFeedback';

const TextGroup = ({ input, groupLabel,disabled, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-control ${isInvalid ? 'is-invalid' : ''}`;
    return (
        <div className="form-group">
            <div className="input-group" >
                <input disabled={disabled} type="text" id={input.name} className={inputClass} {...input} />
                <span className="input-group-text"> {groupLabel} </span>
            </div>
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default TextGroup;
