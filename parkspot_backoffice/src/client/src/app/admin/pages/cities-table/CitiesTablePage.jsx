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
import CitiesTable from '../../components/cities-table';

class CitiesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <CitiesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (CitiesTablePage);