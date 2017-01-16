import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  routing: routerReducer,
  form,
});

export default rootReducer;