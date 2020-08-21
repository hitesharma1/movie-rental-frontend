import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select"

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  submitHandler = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  changeHandler = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.id] = errorMessage;
    else delete errors[input.id];

    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  renderInput(id, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        id={id}
        type={type}
        value={data[id]}
        label={label}
        onChange={this.changeHandler}
        error={errors[id]}
      />
    );
  }

  renderSelect(id, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        id={id}
        value={data[id]}
        label={label}
        options={options}
        onChange={this.changeHandler}
        error={errors[id]}
      />
    )
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
