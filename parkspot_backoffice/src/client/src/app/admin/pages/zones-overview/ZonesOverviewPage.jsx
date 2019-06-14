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
import ZonesTablePage from '../zones-table';
import ZoneFormPage from '../zone-form';

const tabs = [
  { id: 'List', link: '/admin/zones' },
  { id: 'Create new zone', link: '/admin/zones/create' },
];

class ZonesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Zones Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/zones" component={ZonesTablePage}></Route>
        <Route path="/admin/zones/create" component={ZoneFormPage}></Route>
        <Route path="/admin/zones/:id/edit" component={ZoneFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (ZonesOverviewPage);