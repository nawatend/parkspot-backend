/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/*
Components
*/
import UsersTable from '../../components/users-table';

class UsersTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>
    )
  }
}

export default (UsersTablePage);