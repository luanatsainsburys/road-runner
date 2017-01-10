import {UPDATE_PERSON_FILTER} from '../constants/actionTypes';
// import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export function filterReducer(state = initialState.currentPersonFilter, action) {
    switch (action.type) {
        case UPDATE_PERSON_FILTER:

            return action.filter;

        default:
            return state;
    }
}
