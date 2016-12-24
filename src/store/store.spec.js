import * as ActionTypes from '../constants/actionTypes';

import MockDate from 'mockdate';
import { expect } from 'chai';
import { createStore } from 'redux';

import calculator from '../utils/fuelSavingsCalculator';
import dateHelper from '../utils/dateHelper';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

import {normalize} from 'normalizr';
import * as schema from '../actions/schema';

describe('Store', () => {
  let dateModified;
  before(() => {
    MockDate.set(new Date());
    dateModified = dateHelper.getFormattedDateTime();
  });
  after(() => MockDate.reset());

  
  it('should handle SAVE_PERSON action', () => {
    const store = createStore(rootReducer, initialState);

    const serverResponse = {"@odata.context":"http://services.odata.org/TripPinRESTierService/(S(22d2qys54io3bbej0tmg2lnr))/$metadata#People/$entity","UserName":"russellwhyte","FirstName":"Russell","LastName":"Whyte","MiddleName":null,"Gender":"Male","Age":null,"Emails":["Russell@example.com","Russell@contoso.com"],"FavoriteFeature":"Feature1","Features":["Feature1","Feature2"],"AddressInfo":[{"Address":"187 Suffolk Ln.","City":{"Name":"Boise","CountryRegion":"United States","Region":"ID"}}],"HomeAddress":null};

    const action = { type: ActionTypes.SAVE_PERSON, response: normalize(serverResponse, schema.person)};

    store.dispatch(action);

    const actual = store.getState();

    const expected = {
      "russellwhyte": {
        "@odata.context": "http://services.odata.org/TripPinRESTierService/(S(22d2qys54io3bbej0tmg2lnr))/$metadata#People/$entity",
        "UserName": "russellwhyte",
        "FirstName": "Russell",
        "LastName": "Whyte",
        "MiddleName": null,
        "Gender": "Male",
        "Age": null,
        "Emails": [
          "Russell@example.com",
          "Russell@contoso.com"
        ],
        "FavoriteFeature": "Feature1",
        "Features": [
          "Feature1",
          "Feature2"
        ],
        "AddressInfo": [
          "187 Suffolk Ln."
        ],
        "HomeAddress": null
      }
    };
    // const test = JSON.parse(expected);
    expect(actual.people).to.deep.equal(expected);
  });

  it('should display results when necessary data is provided', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newMpg', value: 20 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradeMpg', value: 10 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradePpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDriven', value: 100 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDrivenTimeframe', value: 'month' }
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      newMpg: 20,
      tradeMpg: 10,
      newPpg: 1.50,
      tradePpg: 1.50,
      milesDriven: 100,
      milesDrivenTimeframe: 'month',
      displayResults: false,
      dateModified,
      necessaryDataIsProvidedToCalculateSavings: true,
      savings: calculator().calculateSavings(store.getState().fuelSavings)
    };

    expect(actual.fuelSavings).to.deep.equal(expected);
  });

  it('should not display results when necessary data is not provided', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newMpg', value: 20 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradeMpg', value: 10 },
      // { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradePpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDriven', value: 100 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDrivenTimeframe', value: 'month' }
    ];

    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();

    const expected = {
      newMpg: 20,
      tradeMpg: 10,
      newPpg: '',
      tradePpg: 1.5,
      milesDriven: 100,
      milesDrivenTimeframe: 'month',
      displayResults: false,
      dateModified,
      necessaryDataIsProvidedToCalculateSavings: false,
      savings: { annual: 0, monthly: 0, threeYear: 0 }
    };


    expect(actual.fuelSavings).to.deep.equal(expected);
  });


  it('should handle a flurry of actions', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newMpg', value: 20 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradeMpg', value: 10 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradePpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDriven', value: 100 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDrivenTimeframe', value: 'month' },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newMpg', value: 20 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradeMpg', value: 10 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 },
      { type: ActionTypes.SAVE_FUEL_SAVINGS, dateModified, settings: store.getState() },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradePpg', value: 1.50 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDriven', value: 100 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDrivenTimeframe', value: 'week' },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newMpg', value: 20 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradeMpg', value: 10 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 }
    ];
    actions.forEach(action => store.dispatch(action));

    const lastGoodSavings = calculator().calculateSavings(store.getState().fuelSavings);

    const moreActions = [
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'tradePpg', value: 0 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDriven', value: 100 },
      { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'milesDrivenTimeframe', value: 'year' }
    ];

    // actions.push(...moreActions);
    moreActions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      newMpg: 20,
      tradeMpg: 10,
      newPpg: 1.50,
      tradePpg: 0,
      milesDriven: 100,
      milesDrivenTimeframe: 'year',
      displayResults: false,
      dateModified,
      necessaryDataIsProvidedToCalculateSavings: false,
      savings: lastGoodSavings
    };

    expect(actual.fuelSavings).to.deep.equal(expected);
  });
});
