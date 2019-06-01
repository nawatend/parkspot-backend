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
import PostsTablePage from '../posts-table';
import PostFormPage from '../post-form';

const tabs = [
  { id: 'List', link: '/admin/categories' },
  { id: 'Create new category', link: '/admin/categories/create' },
];

class CategoriesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Categories Overview" tabs={tabs}>
        { children }
      </ContentLayout>
    )
  }
}

export default (CategoriesOverviewPage);