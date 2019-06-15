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
import CityZoneForm from '../../components/cityZone-form';

class CityZoneFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <CityZoneForm cityZoneId={id} />
              ) : (
              <CityZoneForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (CityZoneFormPage);