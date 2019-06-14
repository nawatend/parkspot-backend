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

class HomeAddressesTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    homeAddresses: null,
    homeAddressId: null,
    homeAddressAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };



  handleDialogOpen = (homeAddressId, homeAddressAction) => {
    let title = '';
    let message = '';

    switch (homeAddressAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the homeAddress with id ${homeAddressId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the homeAddress with id ${homeAddressId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the homeAddress with id ${homeAddressId}?`;
        break;
    }

    this.setState({
      homeAddressId: homeAddressId,
      homeAddressAction: homeAddressAction,
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

    switch (this.state.homeAddressAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/homeAddresses/${this.state.homeAddressId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/homeAddresses/${this.state.homeAddressId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/homeAddresses/${this.state.homeAddressId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.mode && results.mode === 'delete') {
          this.loadHomeAddresses();
        } else {
          const homeAddress = results.homeAddress;
          const i = this.state.homeAddresses.findIndex((obj, index, array) => {
            return obj._id === homeAddress._id;
          });
          const homeAddresses = this.state.homeAddresses;
          homeAddresses[i] = homeAddress;

          this.setState(prevState => ({
            ...prevState,
            homeAddresses: homeAddresses
          }));
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadHomeAddresses();
  }

  loadHomeAddresses = () => {
    fetch('/api/v1/homeAddresses')
      .then(response => response.json())
      .then(item => this.setState({ homeAddresses: item }));
  }

  render() {
    const { classes } = this.props;
    const { homeAddresses } = this.state;

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
              {homeAddresses && homeAddresses.map((homeAddress, index) => (
                <TableRow key={homeAddress.id}>
                  <TableCell>{homeAddress.user_id}</TableCell>
                  <TableCell>{homeAddress.address}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={`/admin/homeAddresses/${homeAddress.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(homeAddress.id, (homeAddress.deleted_at) ? POSTACTIONSENUM.SOFTUNDELETE : POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((homeAddress.deleted_at) ? 0.3 : 1) }}>
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(homeAddress.id, POSTACTIONSENUM.DELETE)}>
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

export default withStyles(styles)(HomeAddressesTable);
