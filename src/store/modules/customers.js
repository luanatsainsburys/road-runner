// customers.js
import Immutable from 'immutable';
import initialState from '../../reducers/initialState';

// Actions
const LOAD   = 'road-runner/person/LOAD';
const CREATE = 'road-runner/person/CREATE';
const UPDATE = 'road-runner/person/UPDATE';
const REMOVE = 'road-runner/person/REMOVE';
//const LOADING = 'road-runner/person/LOADING';

// Reducer
export default function reducer(state = initialState.get('person'), action = {}) {
    switch (action.type) {
        case LOAD:
            return Immutable.fromJS(action.person);//Plain js object from server

        case UPDATE:
            return action.person;//Already immutable type

        // do reducer stuff
        default: return state;
    }
}

// Action Creators

function fetchPersonFromServer() {
  return fetch("http://devtlnx0157.stbc2.jstest2.net:15100/v2/customer-profiles/50000007797810?type=ecid");
}

export function loadPerson(name) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetchPersonFromServer().then(
      response => response.json().then(
          person=>dispatch(
              updatePerson(Immutable.fromJS(person)))),
      error => console.log('Error:'+error+' getting person ' + name)
    );
  };
}

// export function loadPerson() {
//   return { type: LOAD };
// }

export function createPerson(person) {
  return { type: CREATE, person };
}

export function updatePerson(person) {
  return { type: UPDATE, person };
}

export function removePerson(person) {
  return { type: REMOVE, person };
}

//Selectors
export function getPerson (state) {
  return state.get("person");
}


// export function searchCustomer(url) {
//     return (dispatch) => {
//         dispatch(dataIsLoading(true));
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//                 dispatch(dataIsLoading(false));
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)))
//             .catch(() => dispatch(itemsHasErrored(true)));
//     };
// }