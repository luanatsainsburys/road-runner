import {Schema, arrayOf} from 'normalizr';

export const person = new Schema('people',  { idAttribute: 'UserName' });

export const address = new Schema('address',  { idAttribute: 'Address' });

person.define({
  AddressInfo: arrayOf(address),
  HomeAddress: address
});