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
import HomeAddressForm from '../../components/homeAddress-form';

class HomeAddressFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <HomeAddressForm homeAddressId={id} />
          ) : (
              <HomeAddressForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (HomeAddressFormPage);