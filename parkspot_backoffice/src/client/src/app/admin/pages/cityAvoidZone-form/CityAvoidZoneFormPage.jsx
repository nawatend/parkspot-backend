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
import CityAvoidZoneForm from '../../components/cityAvoidZone-form';

class CityAvoidZoneFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <CityAvoidZoneForm cityAvoidZoneId={id} />
              ) : (
              <CityAvoidZoneForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (CityAvoidZoneFormPage);