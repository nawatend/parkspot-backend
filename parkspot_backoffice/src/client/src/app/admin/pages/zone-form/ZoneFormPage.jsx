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
import ZoneForm from '../../components/zone-form';

class ZoneFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <ZoneForm zoneId={id} />
          ) : (
              <ZoneForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (ZoneFormPage);