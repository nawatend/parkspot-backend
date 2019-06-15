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
import CityZonesTablePage from '../cityZones-table';
import CityZoneFormPage from '../cityZone-form';

const tabs = [
  { id: 'List', link: '/admin/cityZones' },
  { id: 'Create new cityZone', link: '/admin/cityZones/create' },
];

class CityZonesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="CityZones Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/cityZones" component={CityZonesTablePage}></Route>
        <Route path="/admin/cityZones/create" component={CityZoneFormPage}></Route>
        <Route path="/admin/cityZones/:id/edit" component={CityZoneFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (CityZonesOverviewPage);