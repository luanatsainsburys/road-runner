import React from 'react';
import ReactDataGrid from 'react-data-grid';
import capitalize from 'lodash';

import northwindCustomerData from '../reducers/northwindCustomerData';

var colNames = [
   "id",
   "company",
   "last_name",
   "first_name",
   "email_address",
   "job_title",
   "business_phone",
   "home_phone",
   "mobile_phone",
   "fax_number",
   "address",
   "city",
   "state_province",
   "zip_postal_code",
   "country_region",
   "web_page",
   "notes",
   "attachments"
];

var makeColSpec = (x) => ({key: x, name: capitalize(x)});

const CustomerDataGrid = React.createClass({
  getInitialState() {
    this.createRows();
    this._columns = colNames.map((x) => {return {key: x, name: _.capitalize(x)}});
    return null;
  },

  createRows() {
    // let rows = [];
    // for (let i = 1; i < 1000; i++) {
    //   rows.push({
    //     id: i,
    //     title: 'Title ' + i,
    //     count: i * 1000
    //   });
    // }

    this._rows = northwindCustomerData;
  },

  rowGetter(i) {
    return this._rows[i];
  },

  render() {
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />);
  }
});

export default CustomerDataGrid;

// module.exports = exampleWrapper({
//   WrappedComponent: Example,
//   exampleName: 'Basic Example',
//   exampleDescription: 'A display only grid.',
//   examplePath: './scripts/example01-basic.js',
//   examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
// });