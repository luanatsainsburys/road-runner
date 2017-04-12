// northWindCustomer.js
import northWindCustomerData from '../../reducers/northWindCustomerData';

// Actions
const LOAD   = 'road-runner/northWindCustomer/LOAD';
const CREATE = 'road-runner/northWindCustomer/CREATE';
const UPDATE = 'road-runner/northWindCustomer/UPDATE';
const REMOVE = 'road-runner/northWindCustomer/REMOVE';

// Reducer
export default function reducer(state = northWindCustomerData, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadNorthWindCustomers() {
  return { type: LOAD };
}

export function createNorthWindCustomer(customer) {
  return { type: CREATE, customer };
}

export function updateNorthWindCustomer(customer) {
  return { type: UPDATE, customer };
}

export function removeNorthWindCustomer(customer) {
  return { type: REMOVE, customer };
}