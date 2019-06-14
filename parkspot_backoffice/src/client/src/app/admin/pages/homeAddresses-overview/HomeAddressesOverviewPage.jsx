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
import HomeAddressesTablePage from '../homeAddresses-table';
import HomeAddressFormPage from '../homeAddress-form';

const tabs = [
  { id: 'List', link: '/admin/homeAddresses' },
  { id: 'Create new homeAddress', link: '/admin/homeAddresses/create' },
];

class HomeAddressesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="HomeAddresses Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/homeAddresses" component={HomeAddressesTablePage}></Route>
        <Route path="/admin/homeAddresses/create" component={HomeAddressFormPage}></Route>
        <Route path="/admin/homeAddresses/:id/edit" component={HomeAddressFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (HomeAddressesOverviewPage);