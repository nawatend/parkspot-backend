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
import CityForm from '../../components/city-form';

class CityFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <CityForm cityId={id} />
          ) : (
              <CityForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (CityFormPage);