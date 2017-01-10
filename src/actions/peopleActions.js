// require('es6-promise').polyfill();
// import fetch from 'isomorphic-fetch';

import * as types from '../constants/actionTypes';

import * as schema from './schema';
import {normalize} from 'normalizr';

function fetchPersonFromServer() {
  return fetch("http://services.odata.org/TripPinRESTierService/People('russellwhyte')");
}

export function getPerson(name) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetchPersonFromServer().then(
      response => response.json().then(person=>dispatch(savePerson(person))),
      error => console.log('Error:'+error+' getting person ' + name)
    );
  };
}

export function savePerson(response) {
  console.log(response);
  console.log(normalize(response, schema.person));
  return {
    type: types.SAVE_PERSON,
    response: normalize(response, schema.person)
  };
}

export function updatePersonFilter(newFilter) {
  return {
    type: types.UPDATE_PERSON_FILTER,
    filter: newFilter
  };
}
