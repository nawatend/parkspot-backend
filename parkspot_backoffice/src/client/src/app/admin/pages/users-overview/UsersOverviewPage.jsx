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
import UsersTablePage from '../users-table';
import UserFormPage from '../user-form';

const tabs = [
  { id: 'List', link: '/admin/users' },
  { id: 'Create new user', link: '/admin/users/create' },
];

class UsersOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Users Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/users" component={UsersTablePage}></Route>
        <Route path="/admin/users/create" component={UserFormPage}></Route>
        <Route path="/admin/users/:id/edit" component={UserFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (UsersOverviewPage);