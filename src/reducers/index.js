import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import people from './peopleReducer';
import address from './addressReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  address,
  people,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
