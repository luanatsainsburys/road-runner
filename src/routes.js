import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
// import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import PersonPage from './containers/PersonPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import CustomerSearchPage from './components/CustomerSearchPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CustomerSearchPage}/>
    <Route path="customer-search" component={CustomerSearchPage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="people" component={PersonPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
