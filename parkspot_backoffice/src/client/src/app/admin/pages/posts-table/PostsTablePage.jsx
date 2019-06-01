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
import PostsTable from '../../components/posts-table';

class PostsTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <PostsTable />
          </Grid>
      </Grid>
    )
  }
}

export default (PostsTablePage);