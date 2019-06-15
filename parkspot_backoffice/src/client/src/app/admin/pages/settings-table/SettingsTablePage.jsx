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
import SettingsTable from '../../components/settings-table';

class SettingsTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <SettingsTable />
          </Grid>
      </Grid>
    )
  }
}

export default (SettingsTablePage);