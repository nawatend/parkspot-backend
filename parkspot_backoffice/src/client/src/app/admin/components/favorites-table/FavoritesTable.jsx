/*
External libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';

const POSTACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

/*
Styles
*/
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
});

class FavoritesTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    favorites: null,
    favoriteId: null,
    favoriteAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };



  handleDialogOpen = (favoriteId, favoriteAction) => {
    let title = '';
    let message = '';

    switch (favoriteAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the favorite with id ${favoriteId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the favorite with id ${favoriteId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the favorite with id ${favoriteId}?`;
        break;
    }

    this.setState({
      favoriteId: favoriteId,
      favoriteAction: favoriteAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch (this.state.favoriteAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/favorites/${this.state.favoriteId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/favorites/${this.state.favoriteId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/favorites/${this.state.favoriteId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.mode && results.mode === 'delete') {
          this.loadFavorites();
        } else {
          const favorite = results.favorite;
          const i = this.state.favorites.findIndex((obj, index, array) => {
            return obj._id === favorite._id;
          });
          const favorites = this.state.favorites;
          favorites[i] = favorite;

          this.setState(prevState => ({
            ...prevState,
            favorites: favorites
          }));
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadFavorites();
  }

  loadFavorites = () => {
    fetch('/api/v1/favorites')
      .then(response => response.json())
      .then(item => this.setState({ favorites: item }));
  }

  render() {
    const { classes } = this.props;
    const { favorites } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>User _id</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favorites && favorites.map((favorite, index) => (
                <TableRow key={favorite.id}>
                  <TableCell>{favorite.user_id}</TableCell>
                  <TableCell>{favorite.address}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={`/admin/favorites/${favorite.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(favorite.id, (favorite.deleted_at) ? POSTACTIONSENUM.SOFTUNDELETE : POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((favorite.deleted_at) ? 0.3 : 1) }}>
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(favorite.id, POSTACTIONSENUM.DELETE)}>
                      <IconDeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default withStyles(styles)(FavoritesTable);
