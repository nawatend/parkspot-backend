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
import CitiesTablePage from '../cities-table';
import CityFormPage from '../city-form';

const tabs = [
  { id: 'List', link: '/admin/cities' },
  { id: 'Create new city', link: '/admin/cities/create' },
];

class CitiesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Cities Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/cities" component={CitiesTablePage}></Route>
        <Route path="/admin/cities/create" component={CityFormPage}></Route>
        <Route path="/admin/cities/:id/edit" component={CityFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (CitiesOverviewPage);