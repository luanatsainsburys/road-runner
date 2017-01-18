/* eslint-disable react/prop-types */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { Field, reduxForm, propTypes } from 'redux-form/immutable';

// import {getCurrentPerson} from '../reducers/peopleReducer';
//Get required actions
import {loadPerson} from '../store/modules/customers';

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

// const digitsOnly = max => value =>
//   value && (!/^\d{max}$/.test(value)) ? `Must exactly ${max} digits` : undefined;
// const digitsOnly14 = digitsOnly(14);

const digitsOnly = value =>
  value && (!/^\d*$/.test(value)) ? `Only digits please` : undefined;
// const digitsOnly14 = digitsOnly(14);

const validate = values => {
    const errors = {};
    const ecid = values.get('ecid');

    if (!ecid) {
        errors.ecid = 'Required';
    } else if (!/^\d{14}$/.test(ecid)) {
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

    handleFormSubmit(values) {
        const ecid = values.get('ecid');
        this.props.actions.loadPerson(ecid);
        //We can check the form values here before dispatching an action to update the store
        // const newValues = formProps;
        // this.props.submitFormAction(formProps);//
    }



    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="col-sm-4 col-sm-offset-4">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-horizontal">
                    <div className="form-group">
                        <label className="h3">Search customer by ECID</label>
                        <Field name="ecid" type="text" component={renderField} label="ECID" validate={[ maxLength14, digitsOnly ]}/>
                        <br/>
                        <button action="submit" className="btn btn-danger" disabled={submitting}>Search</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({loadPerson}, dispatch)
  };
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
let boundForm = reduxForm({
  form: 'CustomerSearchForm',  // a unique identifier for this form
  validate,
//   enableReinitialize: true
})(CustomerSearchForm);

export default connect(null,mapDispatchToProps)(boundForm);