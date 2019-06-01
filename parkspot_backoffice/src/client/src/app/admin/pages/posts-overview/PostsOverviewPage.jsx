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
  { id: 'List', link: '/admin/posts' },
  { id: 'Create new post', link: '/admin/posts/create' },
];

class PostsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Posts Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/posts" component={ PostsTablePage }></Route>
        <Route path="/admin/posts/create" component={ PostFormPage }></Route>
        <Route path="/admin/posts/:id/edit" component={ PostFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (PostsOverviewPage);