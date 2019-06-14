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

class ZonesTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    zones: null,
    zoneId: null,
    zoneAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };



  handleDialogOpen = (zoneId, zoneAction) => {
    let title = '';
    let message = '';

    switch (zoneAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the zone with id ${zoneId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the zone with id ${zoneId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the zone with id ${zoneId}?`;
        break;
    }

    this.setState({
      zoneId: zoneId,
      zoneAction: zoneAction,
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

    switch (this.state.zoneAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/zones/${this.state.zoneId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/zones/${this.state.zoneId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/zones/${this.state.zoneId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.mode && results.mode === 'delete') {
          this.loadZones();
        } else {
          const zone = results.zone;
          const i = this.state.zones.findIndex((obj, index, array) => {
            return obj._id === zone._id;
          });
          const zones = this.state.zones;
          zones[i] = zone;

          this.setState(prevState => ({
            ...prevState,
            zones: zones
          }));
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadZones();
  }

  loadZones = () => {
    fetch('/api/v1/zones')
      .then(response => response.json())
      .then(item => this.setState({ zones: item }));
  }

  render() {
    const { classes } = this.props;
    const { zones } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>slug</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zones && zones.map((zone, index) => (
                <TableRow key={zone.id}>
                  <TableCell>{zone.id}</TableCell>
                  <TableCell>{zone.name}</TableCell>
                  <TableCell>{zone.slug}</TableCell>
                  <TableCell>{zone.created_at}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={`/admin/zones/${zone.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(zone.id, (zone.deleted_at) ? POSTACTIONSENUM.SOFTUNDELETE : POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((zone.deleted_at) ? 0.3 : 1) }}>
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(zone.id, POSTACTIONSENUM.DELETE)}>
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

export default withStyles(styles)(ZonesTable);
