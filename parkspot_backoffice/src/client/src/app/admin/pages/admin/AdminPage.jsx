/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/*
Pages
*/
import BlogsOverviewPage from '../blogs-overview';
import CategoriesOverviewPage from '../categories-overview';
import PostsOverviewPage from '../posts-overview';
import CountriesOverviewPage from '../countries-overview';
import UsersOverviewPage from '../users-overview';
class AdminPage extends Component {
  render() {
    return (
      <div className="Admin">
        <Route path="/admin/blogs" component={BlogsOverviewPage}></Route>
        <Route path="/admin/categories" component={CategoriesOverviewPage}></Route>
        <Route path="/admin/countries" component={CountriesOverviewPage}></Route>
        <Route path="/admin/posts" component={PostsOverviewPage}></Route>
        <Route path="/admin/users" component={UsersOverviewPage}></Route>
      </div>
    )
  }
}

export default (AdminPage);