/* eslint-disable react/prop-types */

import React, {Component} from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';

// import {getCurrentPerson} from '../reducers/peopleReducer';


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && (error && <span className="error">{error}</span>)}
  </div>
);

// renderField.propTypes = {
//     ...propTypes,
// };


//VALIDATIONS
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength14 = maxLength(14);

const digitsOnly = max => value =>
  value && (!/^\d{max}$/.test(value)) ? `Must exactly ${max} digits` : undefined;
const digitsOnly14 = digitsOnly(14);

const validate = values => {
    const errors = {};
    if (!values.ecid) {
        errors.ecid = 'Required';
    } else if (!/^\d{14}$/.test(values.ecid)) {
        errors.ecid = 'ECID must be a string of 14 digits characters';
    }
    return errors;
};

class CustomerSearchForm extends Component {
    static propTypes = {
        ...propTypes,
        // other props you might be using
    }

    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
    //     const initData = {
    //     "firstName": this.props.currentUser.firstName,
    //     "lastName": this.props.currentUser.lastName,
    //     "sex": this.props.currentUser.sex,
    //     "email": this.props.userEmail,
    //     "phoneNumber": this.props.currentUser.phoneNumber
    //     };

    //     this.props.initialize(initData);
    }

    handleFormSubmit(formProps) {
        formProps;
        //We can check the form values here before dispatching an action to update the store
        // const newValues = formProps;
        // this.props.submitFormAction(formProps);//
    }



    render() {
        return (
            <div className="col-sm-4 col-sm-offset-4">
                <form onSubmit={this.props.handleSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label className="h3">Search customer by ECID</label>
                        <Field name="ecid" type="text" component={renderField} label="ECID" validate={[ maxLength14, digitsOnly14 ]}/>
                        <br/>
                        <button action="submit" className="btn btn-danger">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
export default reduxForm({
  form: 'CustomerSearchForm',  // a unique identifier for this form
  //validate,
//   enableReinitialize: true
})(CustomerSearchForm);