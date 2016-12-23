import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import people from './peopleReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  people,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
