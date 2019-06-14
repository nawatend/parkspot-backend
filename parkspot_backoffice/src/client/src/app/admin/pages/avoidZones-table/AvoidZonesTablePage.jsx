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
import AvoidZonesTable from '../../components/avoidZones-table';

class AvoidZonesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <AvoidZonesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (AvoidZonesTablePage);