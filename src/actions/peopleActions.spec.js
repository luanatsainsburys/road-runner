import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './peopleActions';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import MockDate from 'mockdate';
import chai, { expect } from 'chai';

import nock from 'nock' //for mocking http requests

import dateHelper from '../utils/dateHelper';

chai.use(sinonChai);

describe('People Actions', () => {
  let dateModified;
  before(() => {
    MockDate.set(new Date());
    dateModified = dateHelper.getFormattedDateTime();
  });

  after(() => MockDate.reset());

  const personName = 'russellwhyte';
  const personStr = `{
    "@odata.context":"http://services.odata.org/TripPinRESTierService/(S(4yhfgxzvvrockjnq3emyqemy))/$metadata#People/$entity",
    "UserName":"russellwhyte",
    "FirstName":"Russell",
    "LastName":"Whyte",
    "MiddleName":null,
    "Gender":"Male",
    "Age":null,
    "Emails":[
        "Russell@example.com",
        "Russell@contoso.com"
    ],
    "FavoriteFeature":"Feature1",
    "Features":[
        "Feature1",
        "Feature2"
    ],
    "AddressInfo":[
        {
            "Address":"187 Suffolk Ln.",
            "City":{
                "Name":"Boise",
                "CountryRegion":"United States",
                "Region":"ID"
            }
        }
    ],
    "HomeAddress":null
  }`;

  let person = JSON.parse(personStr);

  it('should create an action to save a person', () => {
    const dispatch = sinon.spy();
    const expected = {
        type: ActionTypes.SAVE_PERSON,
        person
    };

//   nock("http://services.odata.org/TripPinRESTierService/People('russellwhyte')") //nock let you mock http requests
//     .get()
//     .reply(200, person );

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.getPerson(personName))).to.equal('function');
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.getPerson(personName)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).to.have.been.calledWith(expected);
  });
});
