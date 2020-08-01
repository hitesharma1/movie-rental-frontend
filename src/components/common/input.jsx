import React from "react";

const Input = ({ id, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={id}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
