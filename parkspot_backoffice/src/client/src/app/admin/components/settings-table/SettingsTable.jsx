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

class SettingsTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    settings: null,
    settingId: null,
    settingAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };



  handleDialogOpen = (settingId, settingAction) => {
    let title = '';
    let message = '';

    switch (settingAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the setting with id ${settingId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the setting with id ${settingId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the setting with id ${settingId}?`;
        break;
    }

    this.setState({
      settingId: settingId,
      settingAction: settingAction,
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

    switch (this.state.settingAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/settings/${this.state.settingId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/settings/${this.state.settingId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/settings/${this.state.settingId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.mode && results.mode === 'delete') {
          this.loadSettings();
        } else {
          const setting = results.setting;
          const i = this.state.settings.findIndex((obj, index, array) => {
            return obj._id === setting._id;
          });
          const settings = this.state.settings;
          settings[i] = setting;

          this.setState(prevState => ({
            ...prevState,
            settings: settings
          }));
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadSettings();
  }

  loadSettings = () => {
    fetch('/api/v1/settings')
      .then(response => response.json())
      .then(item => this.setState({ settings: item }));
  }

  render() {
    const { classes } = this.props;
    const { settings } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Zone ID</TableCell>
                <TableCell>Max Price Per Hour</TableCell>
                <TableCell>Max Distance from Destination</TableCell>
                <TableCell>Bankcontact</TableCell>
                <TableCell>Low Emission Zone</TableCell>
                <TableCell>Underground</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settings && settings.map((setting, index) => (
                <TableRow key={setting.id}>
                  <TableCell>{setting.user_id}</TableCell>
                  <TableCell>{setting.zoneId}</TableCell>
                  <TableCell>{setting.price_per_hour}</TableCell>
                  <TableCell>{setting.distance_from_destination}</TableCell>
                  <TableCell>{setting.backcontact}</TableCell>
                  <TableCell>{setting.low_emission_zone}</TableCell>
                  <TableCell>{setting.underground}</TableCell>

                  <TableCell>
                    <IconButton
                      component={Link} to={`/admin/settings/${setting.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(setting.id, (setting.deleted_at) ? POSTACTIONSENUM.SOFTUNDELETE : POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((setting.deleted_at) ? 0.3 : 1) }}>
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(setting.id, POSTACTIONSENUM.DELETE)}>
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

export default withStyles(styles)(SettingsTable);
