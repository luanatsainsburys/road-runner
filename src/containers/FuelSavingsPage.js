import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import * as peopleActions from '../actions/peopleActions';
import FuelSavingsForm from '../components/FuelSavingsForm';
import PersonForm from '../components/PersonForm';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })
  
export const FuelSavingsPage = (props) => {
  props.actions.getPerson("jkhjkhkjh");
  return (
    <div className="container-fluid">
    <FuelSavingsForm
      saveFuelSavings={props.actions.saveFuelSavings}
      calculateFuelSavings={props.actions.calculateFuelSavings}
      fuelSavings={props.fuelSavings}
    />
    <PersonForm onSubmit={showResults}/>
    </div>
  );
};

FuelSavingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},actions,peopleActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
