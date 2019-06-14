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
import FavoriteForm from '../../components/favorite-form';

class FavoriteFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <FavoriteForm favoriteId={id} />
          ) : (
              <FavoriteForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (FavoriteFormPage);