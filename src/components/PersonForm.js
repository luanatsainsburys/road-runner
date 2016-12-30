import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const renderField = field => (
    <div>
      <input {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

class PersonForm extends Component {
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
        //We can check the form values here before dispatching an action to update the store
        const newValues = formProps;
        // this.props.submitFormAction(formProps);//
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
                    <label>First Name:</label>
                    <Field name="FirstName" type="text" component={renderField}/>

                    <label>Last Name:</label>
                    <Field name="LastName" type="text" component={renderField}/>

                    <label>Middle Name:</label>
                    <Field name="MiddleName" type="text" component={renderField}/>
<div className="form-group">
                    <label>Gender:</label>
                    <Field name="Gender" component="select" className="form-control">
                        <option></option>
                        <option name="Male">Male</option>
                        <option name="Female">Female</option>
                    </Field>
</div>
                    <button action="submit">Save changes</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.people.russellwhyte
  };
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PersonForm = reduxForm({
  form: 'Person'  // a unique identifier for this form
})(PersonForm)

// You have to connect() to any reducers that you wish to connect to yourself
PersonForm = connect(
  state => ({
    initialValues: state.people.russellwhyte // pull initial values from account reducer
  })
)(PersonForm)

export default PersonForm;