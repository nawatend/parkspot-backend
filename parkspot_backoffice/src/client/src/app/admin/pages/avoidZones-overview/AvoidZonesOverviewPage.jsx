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
import AvoidZonesTablePage from '../avoidZones-table';
import AvoidZoneFormPage from '../avoidZone-form';

const tabs = [
  { id: 'List', link: '/admin/avoidZones' },
  { id: 'Create new avoidZone', link: '/admin/avoidZones/create' },
];

class AvoidZonesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="AvoidZones Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/avoidZones" component={AvoidZonesTablePage}></Route>
        <Route path="/admin/avoidZones/create" component={AvoidZoneFormPage}></Route>
        <Route path="/admin/avoidZones/:id/edit" component={AvoidZoneFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (AvoidZonesOverviewPage);