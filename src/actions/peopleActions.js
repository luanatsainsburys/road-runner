require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import * as types from '../constants/actionTypes';

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
      error => console.log('Error getting person ' + name)
    );
  };
}

export function savePerson(person) {
  return {
    type: types.SAVE_PERSON,
    person
  };
}

