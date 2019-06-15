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
import CityZonesTable from '../../components/cityZones-table';

class CityZonesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <CityZonesTable />
          </Grid>
      </Grid>
    )
  }
}

export default (CityZonesTablePage);