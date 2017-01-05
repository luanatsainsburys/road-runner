import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions/peopleActions';

import SearchForm from '../components/SearchForm';
import FuelSavingsTextInput from '../components/FuelSavingsTextInput';
import PersonForm from '../components/PersonForm';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })
  
class PersonPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        //Bind to this component
        this.usernameChanging = this.usernameChanging.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
    }
    
    usernameChanging(name, value) {
        //console.log("name="+name+"; value="+value);
    }

    usernameChanged(name, value) {
        console.log("name="+name+"; value="+value);
        console.log(this.state.username);
        this.setState({username: value});
        console.log(this.state.username);
    }


                    // <label className="col-sm-1 control-label" htmlFor="userToFind">Enter username</label>
                    // <FuelSavingsTextInput 
                    //     onChange={this.usernameChanging} 
                    //     onBlur={this.usernameChanged} 
                    //     name="userToFind" 
                    //     value={this.state.username}/>
    render() {
        return (
            <div className="container-fluid">
                <div className="form-group">
                    <SearchForm/>
                    {/* 
                    <PersonForm onSubmit={showResults}/>
                    */}
                </div>
            </div>
        );
    }
}

// export const PersonPage = (props) => {
//   props.actions.getPerson("jkhjkhkjh");
//   return (

//     <div className="container-fluid">
//         <label htmlFor="userToFind">Enter username</label>
//         <FuelSavingsTextInput onChange={this.fuelSavingsKeypress} name="userToFind" value={fuelSavings.newMpg}/>
//         <PersonForm onSubmit={showResults}/>
//     </div>
//   );
// };

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
