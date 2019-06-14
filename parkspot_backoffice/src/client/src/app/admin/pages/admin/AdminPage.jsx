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
import ZonesOverviewPage from '../zones-overview';
import FavoritesOverviewPage from '../favorites-overview';
import HomeAddressesOverviewPage from '../homeAddresses-overview';
import UsersOverviewPage from '../users-overview';
class AdminPage extends Component {
  render() {
    return (
      <div className="Admin">
        {/* <Route path="/admin/blogs" component={BlogsOverviewPage}></Route>
        <Route path="/admin/categories" component={CategoriesOverviewPage}></Route>
        <Route path="/admin/posts" component={PostsOverviewPage}></Route> */}

        <Route path="/admin/countries" component={CountriesOverviewPage}></Route>
        <Route path="/admin/Zones" component={ZonesOverviewPage}></Route>
        <Route path="/admin/users" component={UsersOverviewPage}></Route>
        <Route path="/admin/favorites" component={FavoritesOverviewPage}></Route>
        <Route path="/admin/homeAddresses" component={HomeAddressesOverviewPage}></Route>
      </div>
    )
  }
}

export default (AdminPage);