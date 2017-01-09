import isEmpty from 'lodash/fp/isEmpty';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions/peopleActions';

import SearchForm from '../components/SearchForm';
// import FuelSavingsTextInput from '../components/FuelSavingsTextInput';
import PersonForm from '../components/PersonForm';

// import {getCurrentPerson} from '../reducers/peopleReducer';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 500);
  });
  
class PersonPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            currentPerson: {}
        };

        //Bind to this component
        // this.usernameChanging = this.usernameChanging.bind(this);
        this.userNameChanged = this.userNameChanged.bind(this);

        //Load data if empty
        if (isEmpty(this.props.people)) {
          this.props.actions.getPerson("jkhjkhkjh");
        }
    }

    //Returns empty object if not found
    getCurrentPerson (userName) {
      return Object.assign({}, this.props.people[userName]);
    }
    
    userNameChanged(newUserName) {
      //Get the username person from store to display on PersonForm
      this.setState({username: newUserName, currentPerson: this.getCurrentPerson(newUserName)});
      event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="form-group">
                    <SearchForm onNewData={this.userNameChanged}/>
                    {!isEmpty(this.state.currentPerson) && <PersonForm onSubmit={showResults} initialValues={this.state.currentPerson}/>}
                </div>
            </div>
        );
    }
}

//Component properties
PersonPage.propTypes = {
  actions: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
};

//Use redux store
function mapStateToProps(state) {
  return {
    people: state.people,
    address: state.address,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},actions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonPage);
