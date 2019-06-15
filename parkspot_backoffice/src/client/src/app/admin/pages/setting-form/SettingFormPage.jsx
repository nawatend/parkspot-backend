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
import SettingForm from '../../components/setting-form';

class SettingFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <SettingForm settingId={id} />
              ) : (
              <SettingForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (SettingFormPage);