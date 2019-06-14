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
import ZonesTable from '../../components/zones-table';

class ZonesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ZonesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (ZonesTablePage);