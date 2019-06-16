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

import { AdminLayout } from './admin/layouts';

/*
Page components
*/

import AdminPage from './admin/pages/admin';


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
          <RouteWithLayout exact path='/' layout={AdminLayout} component={AdminPage} />
          <Redirect from="/home" to="/admin" />
          {/* <RouteWithLayout path="/login" layout={LoginLayout} component={LoginPage}></RouteWithLayout> */}
          <RouteWithLayout path="/admin" layout={AdminLayout} component={AdminPage}></RouteWithLayout>
        </Switch>
      </div>
    );
  }
}

export default Main;