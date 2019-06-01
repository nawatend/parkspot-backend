/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

/*
Layout
*/
import { ContentLayout } from '../../layouts';

/*
Pages
*/
import CountriesTablePage from '../countries-table';
import CountryFormPage from '../country-form';

const tabs = [
  { id: 'List', link: '/admin/countries' },
  { id: 'Create new country', link: '/admin/countries/create' },
];

class CountriesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Countries Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/countries" component={CountriesTablePage}></Route>
        <Route path="/admin/countries/create" component={CountryFormPage}></Route>
        <Route path="/admin/countries/:id/edit" component={CountryFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (CountriesOverviewPage);