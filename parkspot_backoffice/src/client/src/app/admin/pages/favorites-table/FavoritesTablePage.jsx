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
import FavoritesTable from '../../components/favorites-table';

class FavoritesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <FavoritesTable />
        </Grid>
      </Grid>
    )
  }
}

export default (FavoritesTablePage);