import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../Form/TextInput";
import { register } from "../../store/Actions/UserActions";

const Register = (props) => {
  const { register } = props;
  const submitVal = (val) => {
    register(val);
  };
  return (
    <Fragment>
      <h1>Create an account</h1>
      <span>It's quick and easy.</span>
      <form className="signup-form" onSubmit={props.handleSubmit(submitVal)}>
        <div className="first-and-sirname">
          <Field
            type="text"
            name="fname"
            component={TextInput}
            placeholder="First Name"
          />
          <Field
            type="text"
            name="lname"
            component={TextInput}
            placeholder="Last Name"
          />
        </div>
        <div className="mobile-number-or-email-address">
          <Field
            type="email"
            name="email"
            component={TextInput}
            placeholder="Email Address"
          />
        </div>
        <div className="new-password">
          <Field
            type="password"
            name="password"
            component={TextInput}
            placeholder="New Password"
          />
        </div>
        <div className="signup-btn">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapState = (state) => {
  return {
    auth: state.firebase.auth.uid,
  };
};
const mapDispatch = (dispatch) => {
  return {
    register: (cred) => dispatch(register(cred)),
  };
};
export default connect(
  mapState,
  mapDispatch
)(reduxForm({ form: "RegisterForm" })(Register));
