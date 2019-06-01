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


const tabs = [
  { id: 'List', link: '/admin/blogs' },
  { id: 'Create new blog', link: '/admin/blogs/create' },
];

class BlogsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Blogs Overview" tabs={tabs}>
        { children }
      </ContentLayout>
    )
  }
}

export default (BlogsOverviewPage);