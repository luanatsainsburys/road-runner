import {combineReducers} from 'redux-immutable';
//import {routerReducer} from 'react-router-redux';
import routerReducer from './immutableRouteReducer';
import { reducer as form } from 'redux-form/immutable';
import person from '../store/modules/customers';

const rootReducer = combineReducers({
  routing: routerReducer,
  form,
  person
});

export default rootReducer;