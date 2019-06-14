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
import FavoritesTablePage from '../favorites-table';
import FavoriteFormPage from '../favorite-form';

const tabs = [
  { id: 'List', link: '/admin/favorites' },
  { id: 'Create new favorite', link: '/admin/favorites/create' },
];

class FavoritesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Favorites Overview" tabs={tabs}>
        {children}
        <Route exact path="/admin/favorites" component={FavoritesTablePage}></Route>
        <Route path="/admin/favorites/create" component={FavoriteFormPage}></Route>
        <Route path="/admin/favorites/:id/edit" component={FavoriteFormPage}></Route>
      </ContentLayout>
    )
  }
}

export default (FavoritesOverviewPage);