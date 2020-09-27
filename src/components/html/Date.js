import React from "react";
import InvalidFeedback from './InvalidFeedback';

const Date = ({ input, label, required, meta }) => {
    const isInvalid = meta.error && meta.touched;
    const inputClass = `form-control ${isInvalid ? 'is-invalid' : ''}`;
    return (
        <div className="form-group">
            <input className={inputClass} id={input.name} type="date"
                {...input}
            />
            <InvalidFeedback meta={meta} />
        </div>
    );
};

export default Date;
