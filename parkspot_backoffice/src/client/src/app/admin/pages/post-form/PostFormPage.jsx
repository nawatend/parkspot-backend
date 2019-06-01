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
import PostForm from '../../components/post-form';

class PostFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <PostForm postId={id} />
              ) : (
              <PostForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (PostFormPage);