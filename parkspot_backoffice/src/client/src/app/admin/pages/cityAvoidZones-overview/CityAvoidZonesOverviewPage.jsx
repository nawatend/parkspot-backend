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
import CityAvoidZonesTablePage from '../cityAvoidZones-table';
import CityAvoidZoneFormPage from '../cityAvoidZone-form';

const tabs = [
  { id: 'List', link: '/admin/cityAvoidZones' },
  { id: 'Create new cityZone', link: '/admin/cityAvoidZones/create' },
];

class CityAvoidZonesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="CityAvoidZones Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/cityAvoidZones" component={CityAvoidZonesTablePage}></Route>
        <Route path="/admin/cityAvoidZones/create" component={CityAvoidZoneFormPage}></Route>
        <Route path="/admin/cityAvoidZones/:id/edit" component={CityAvoidZoneFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (CityAvoidZonesOverviewPage);