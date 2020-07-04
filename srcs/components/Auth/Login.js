import React from 'react';
import { connect } from 'react-redux';
import {combineValidators,isRequired} from 'revalidate';
import {reduxForm,Field} from 'redux-form';
import TextInput from '../Form/TextInput';
import { logIn } from '../../store/Actions/UserActions';
const validate = combineValidators({
    email:isRequired({message:'Email'}),
    password:isRequired({message:'Password'})
});
const Login = ({logIn,handleSubmit}) => {
    
    const submitVal = val => {
        // console.log(val);
        logIn(val);
    }
    return (
        <form className="login-form" onSubmit={handleSubmit(submitVal)}>
            <div className="email">
                <label htmlFor="email">Email or phone</label>
                <Field name="email" component={TextInput}  type="email" />
            </div>
            <div className="password">
                <label htmlFor="password">Password</label>
                <Field name="password" component={TextInput}  type="password" />                
            </div>
            <div className="btn-container">
                <button type="submit">Log In</button>
            </div>
        </form>
    )
}

const mapState = state => {
    // console.log(state);
    return {

    }
}

const mapDispatch = dispatch => {
    return {
        logIn:cred => dispatch(logIn(cred))
    }
}

export default connect(mapState,mapDispatch)(reduxForm({form:'LoginForm',validate})((Login)));
