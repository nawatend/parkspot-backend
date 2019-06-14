/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';

/*
Utilities
*/
import { RouteWithLayout } from './utilities';

/*
Layout
*/
import { LoginLayout, PageLayout } from './layouts';
import { AdminLayout } from './admin/layouts';

/*
Page components
*/
import HomePage from './pages/home';
import AdminPage from './admin/pages/admin';
import LoginPage from './pages/login';
import NewsPage from './pages/news';
import CountriesPage from './pages/countries';
import PostDetailPage from './pages/post-detail';

/*
Import styling
*/
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* direct to login, because only admin needed */}
          <RouteWithLayout exact path='/' layout={LoginLayout} component={LoginPage} />
          <Redirect from="/home" to="/" />
          <RouteWithLayout exact path='/news' layout={PageLayout} component={NewsPage} />
          <RouteWithLayout exact path='/countries' layout={PageLayout} component={CountriesPage} />
          <RouteWithLayout exact path='/news/:id' layout={PageLayout} component={PostDetailPage} />
          <RouteWithLayout path="/login" layout={LoginLayout} component={LoginPage}></RouteWithLayout>
          <RouteWithLayout path="/admin" layout={AdminLayout} component={AdminPage}></RouteWithLayout>
        </Switch>
      </div>
    );
  }
}

export default Main;