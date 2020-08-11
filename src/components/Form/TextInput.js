import React from "react";

const Textinput = (props) => {
  const {
    input,
    type,
    placeholder,
    meta: { touched, error },
  } = props;
  return (
    <React.Fragment>
      <input
        {...input}
        placeholder={touched && error ? error : placeholder}
        type={type}
        autoComplete="off"
        required={placeholder}
        className={touched && error ? "ErrorInput" : null}
      />
    </React.Fragment>
  );
};

export default Textinput;
