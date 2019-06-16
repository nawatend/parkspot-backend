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
import CityAvoidZonesTable from '../../components/cityAvoidZones-table';

class CityAvoidZonesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <CityAvoidZonesTable />
          </Grid>
      </Grid>
    )
  }
}

export default (CityAvoidZonesTablePage);