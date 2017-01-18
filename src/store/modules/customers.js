// customers.js
import Immutable from 'immutable';
import initialState from '../../reducers/initialState';

import fetch from 'isomorphic-fetch';

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

   function makeBaseAuth (user, pswd){ 
      let token = user + ':' + pswd;
      let hash = "";
      if (btoa) {
         hash = btoa(token);
      }
      return "Basic " + hash;
   }

function fetchPersonFromServer(name) {
    const headers = {
        'Access-Control-Allow-Origin':'*',
        
'Origin': 'http://localhost:3000',
 //       'Accept': 'application/json',
 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type': 'application/json',
//        'Authorization': 'Basic '+btoa('SIPTester:SIPTester'),
        'Authorization': makeBaseAuth('SIPTester','SIPTester'),
//'Authorization': 'Basic U0lQVGVzdGVyOlNJUFRlc3Rlcg==',
        'Cache-control': 'no-cache'
    };


//     Host: devtlnx0157.stbc2.jstest2.net:15100
// Connection: keep-alive
// Pragma: no-cache
// Cache-Control: no-cache
// Authorization: Basic U0lQVGVzdGVyOlNJUFRlc3Rlcg==
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
// Accept-Encoding: gzip, deflate, sdch
// Accept-Language: en-US,en;q=0.8
// Cookie: ssnid=

    const options = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
        //cache: 'default'
 };

  return fetch('http://devtlnx0157.stbc2.jstest2.net:15100/v2/customer-profiles/50000007797810?type=ecid', options);
  //return fetch('/v2/customer-profiles/50000007797810?type=ecid', options);
}

function errorHandler (error) {
        console.log('Error:'+error+' getting person ');
}
// export function loadPerson(name) {

//   // Invert control!
//   // Return a function that accepts `dispatch` so we can dispatch later.
//   // Thunk middleware knows how to turn thunk async actions into actions.

//   return function (dispatch) {
//     return fetchPersonFromServer(name).then(
//       response => response.json().then(
//           person=>dispatch(
//               updatePerson(Immutable.fromJS(person)))),
//       errorHandler
//     );
//   };
// }


export function loadPerson(name) {
    return (dispatch) => {
        //dispatch(dataIsLoading(true));
        fetchPersonFromServer(name)
        .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                //dispatch(dataIsLoading(false));
                return response;
            })
        .then((response) => response.json())
//        .then((items) => dispatch(itemsFetchDataSuccess(items)))
        .then((person) => dispatch(updatePerson(Immutable.fromJS(person))))
//        .catch(() => dispatch(itemsHasErrored(true)));
        .catch(errorHandler);
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