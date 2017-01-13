import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {getCurrentPerson} from '../reducers/peopleReducer';


const renderField = field => (
    <div className="col-sm-4">
      <input {...field.input} className="form-control"/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

let PersonForm = class RawForm extends Component {

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

//     componentWillReceiveProps(nextProps) {
//         if (this.props.initialValues!==nextProps.initialValues) {
// //            this.props.initialize("Person", nextProps.initialValues, ['FirstName', 'LastName', 'MiddleName', 'Gender']);
//             this.props.initialize("Person", nextProps.initialValues, false);
//             this.props.reset("Person");
//         }
//     }

    render() {
        const inputWidth = {"className": "col-sm-4"};
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))} className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="FirstName">First Name:</label>
                        <Field name="FirstName" type="text" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="LastName">Last Name:</label>
                        <Field name="LastName" type="text" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="MiddleName">Middle Name:</label>
                        <Field props={inputWidth} name="MiddleName" type="text" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Gender">Gender:</label>
                        <div className="col-sm-4">
                            <Field name="Gender" component="select" className="form-control">
                                <option/>
                                <option name="Male">Male</option>
                                <option name="Female">Female</option>
                            </Field>
                        </div>
                    </div>
                    <button action="submit" className="btn btn-info col-sm-offset-2">Save changes</button>
                </form>
            </div>
        );
    }
};

// function mapStateToProps(state) {
//   return {
//     user: state.people.russellwhyte
//   };
// }

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PersonForm = reduxForm({
  form: 'Person',  // a unique identifier for this form
  enableReinitialize: true
//   fields: ['FirstName', 'LastName', 'MiddleName', 'Gender'],
})(PersonForm);

//You have to connect() to any reducers that you wish to connect to yourself
PersonForm = connect(
  state => ({
    initialValues: getCurrentPerson(state, state.currentPersonFilter), // pull initial values from account reducer
  })
)(PersonForm);

export default PersonForm;