import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import people from './peopleReducer';
import address from './addressReducer';
import {routerReducer} from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  address,
  people,
  fuelSavings,
  routing: routerReducer,
  form: reduxFormReducer,
});

export default rootReducer;
