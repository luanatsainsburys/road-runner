import React, {Component} from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// import {getCurrentPerson} from '../reducers/peopleReducer';


const renderField = field => (
    <div className="">
      <input {...field.input} className="form-control"/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

let CustomerSearchForm = class extends Component {
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
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))} className="form-horizontal">
                    <div className="form-group">
                        <label className="h3">Search customer by ECID</label>
                        <Field name="ecid" type="text" component={renderField}/>
                        <br/>
                        <button action="submit" className="btn btn-danger">Search</button>
                    </div>
                </form>
            </div>
        );
    }
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CustomerSearchForm = reduxForm({
  form: 'CustomerSearchForm',  // a unique identifier for this form
//   enableReinitialize: true
})(CustomerSearchForm);

export default CustomerSearchForm;