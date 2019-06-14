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
import HomeAddressesTable from '../../components/homeAddresses-table';

class HomeAddressesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <HomeAddressesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (HomeAddressesTablePage);