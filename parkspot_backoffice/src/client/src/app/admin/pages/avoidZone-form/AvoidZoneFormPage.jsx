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
import AvoidZoneForm from '../../components/avoidZone-form';

class AvoidZoneFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <AvoidZoneForm avoidZoneId={id} />
          ) : (
              <AvoidZoneForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (AvoidZoneFormPage);