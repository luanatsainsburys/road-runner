import {combineReducers} from 'redux-immutable';
//import {routerReducer} from 'react-router-redux';
import routerReducer from './immutableRouteReducer';
import { reducer as form } from 'redux-form/immutable';

const rootReducer = combineReducers({
  routing: routerReducer,
  form,
});

export default rootReducer;