import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import OldSelect from "./oldSelect";
import Select from "./select";
import Radio from "./radio";
import TextArea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    const propObj = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(propObj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const option = {
      abortEarly: false,
    };
    const { data, schema } = this.state;
    const { error } = Joi.validate(data, schema, option);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    console.log(data);

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(this.state.schema);

    this.setState({ errors: errors || {} });
    // console.log(errors);
    if (errors) return;
    // console.log("No Error");
    this.doSubmit();
  };

  renderInput = (
    fieldName,
    label,
    type = "text",
    isDisabled = false,
    defaultValue = ""
  ) => {
    const { data, errors } = this.state;
    return (
      console.log(defaultValue),
      (
        <Input
          type={type}
          name={fieldName}
          label={label}
          // value={data[fieldName]}
          error={errors[fieldName]}
          onChange={this.handleChange}
          disabled={isDisabled}
          // key={defaultValue}
          defaultValue={defaultValue}
          // defaultValue="testing"
        />
      )
    );
  };

  renderMultilineInput = (fieldName, label) => {
    const { data, errors } = this.state;
    return (
      <TextArea
        rows="10"
        cols="10"
        name={fieldName}
        label={label}
        value={data[fieldName]}
        error={errors[fieldName]}
        onChange={this.handleChange}
      />
    );
  };

  renderOldSelect = (fieldName, label, options, multiple = false) => {
    const { errors } = this.state;
    return (
      <OldSelect
        name={fieldName}
        label={label}
        options={options}
        multiple={multiple}
        error={errors[fieldName]}
        onChange={this.handleChange}
      />
    );
  };

  handleOptionChange = (e) => {
    this.setState({
      data: { [e.target.value]: "", ...this.state.data },
      selectedOption: e.target.value,
    });
  };

  renderRadio = (radioGroupName, isInline) => {
    const { options, selectedOption } = this.state;
    return (
      <Radio
        radioGroupName={radioGroupName}
        options={options}
        selected={selectedOption}
        isInline={isInline}
        onChange={this.handleOptionChange}
      />
    );
  };

  handleSelectChange = (value, { name }) => {
    if (value == null) return;
    if (typeof value[Symbol.iterator] === "function")
      value = [...value.entries()];
    else value = value.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name: name, value: value });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };

    data[name] = value;

    this.setState({ data, errors });
  };

  renderSelect = (
    fieldName,
    label,
    options,
    isMulti,
    isDisabled,
    isCreatable,
    onChange = this.handleSelectChange,
    defaultValue = ""
  ) => {
    const { errors } = this.state;
    console.log(defaultValue);
    return (
      <Select
        name={fieldName}
        label={label}
        options={options}
        isMulti={isMulti}
        error={errors[fieldName]}
        // onChange={this.handleSelectChange}
        onChange={onChange}
        isDisabled={isDisabled}
        isCreatable={isCreatable}
        defaultValue={defaultValue}
      />
    );
  };

  renderButton = (label, actionOnClicked, buttonClass = "btn-green-dark") => {
    const button = "btn " + buttonClass;
    return (
      <button
        // disabled={this.validate()}
        className={button}
        onClick={actionOnClicked}
      >
        {label}
      </button>
    );
  };
}

export default Form;
