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
import CountriesTable from '../../components/countries-table';

class CountriesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <CountriesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (CountriesTablePage);