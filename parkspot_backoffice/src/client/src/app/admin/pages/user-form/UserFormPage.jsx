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
import UserForm from '../../components/user-form';

class UserFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {id ? (
            <UserForm userId={id} />
          ) : (
              <UserForm />
            )}
        </Grid>
      </Grid>
    )
  }
}

export default (UserFormPage);