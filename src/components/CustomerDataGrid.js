import React from 'react';
import ReactDataGrid from 'react-data-grid';
import capitalize from 'lodash/capitalize';

import northwindCustomerData from '../reducers/northwindCustomerData';

const colNames = [
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

const CustomerDataGrid = React.createClass({
  getInitialState() {
    this.createRows();
    this._columns = colNames.map((x) => {return {key: x, name: capitalize(x)};});
    return null;
  },

  createRows() {
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