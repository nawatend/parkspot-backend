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
import CountryForm from '../../components/country-form';

class CountryFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <CountryForm countryId={id} />
          ) : (
              <CountryForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (CountryFormPage);