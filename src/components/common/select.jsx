import React from 'react';

const Select = ({ id, label, options, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...rest} className="form-control">
                <option value="" />
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Select;