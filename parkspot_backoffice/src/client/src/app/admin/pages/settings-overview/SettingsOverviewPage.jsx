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
import SettingsTablePage from '../settings-table';
import SettingFormPage from '../setting-form';

const tabs = [
  { id: 'List', link: '/admin/settings' },
  { id: 'Create new setting', link: '/admin/settings/create' },
];

class SettingsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Settings Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/settings" component={SettingsTablePage}></Route>
        <Route path="/admin/settings/create" component={SettingFormPage}></Route>
        <Route path="/admin/settings/:id/edit" component={SettingFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (SettingsOverviewPage);