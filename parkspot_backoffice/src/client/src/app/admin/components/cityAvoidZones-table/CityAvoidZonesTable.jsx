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

class CityAvoidZonesTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    cityAvoidZones: null,
    cityAvoidZoneId: null,
    cityAvoidZoneAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };



  handleDialogOpen = (cityAvoidZoneId, cityAvoidZoneAction) => {
    let title = '';
    let message = '';

    switch (cityAvoidZoneAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the cityAvoidZone with id ${cityAvoidZoneId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the cityAvoidZone with id ${cityAvoidZoneId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the cityAvoidZone with id ${cityAvoidZoneId}?`;
        break;
    }

    this.setState({
      cityAvoidZoneId: cityAvoidZoneId,
      cityAvoidZoneAction: cityAvoidZoneAction,
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

    switch (this.state.cityAvoidZoneAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/cityAvoidZones/${this.state.cityAvoidZoneId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/cityAvoidZones/${this.state.cityAvoidZoneId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/cityAvoidZones/${this.state.cityAvoidZoneId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.mode && results.mode === 'delete') {
          this.loadCityAvoidZones();
        } else {
          const cityAvoidZone = results.cityAvoidZone;
          const i = this.state.cityAvoidZones.findIndex((obj, index, array) => {
            return obj._id === cityAvoidZone._id;
          });
          const cityAvoidZones = this.state.cityAvoidZones;
          cityAvoidZones[i] = cityAvoidZone;

          this.setState(prevState => ({
            ...prevState,
            cityAvoidZones: cityAvoidZones
          }));
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadCityAvoidZones();
  }

  loadCityAvoidZones = () => {



    fetch('/api/v1/cityAvoidZones')
      .then(response => response.json())
      .then(item => this.setState({ cityAvoidZones: item }));
    console.log(this.state.cityAvoidZones)
  }

  render() {
    const { classes } = this.props;
    const { cityAvoidZones } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>City ID</TableCell>
                <TableCell>City Name</TableCell>
                <TableCell>Avoid Zone ID</TableCell>
                <TableCell>Avoid Zone Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cityAvoidZones && cityAvoidZones.map((cityAvoidZone, index) => (
                <TableRow key={cityAvoidZone.id}>
                  <TableCell>{cityAvoidZone.cityId}</TableCell>
                  <TableCell>{cityAvoidZone.city.name}</TableCell>
                  <TableCell>{cityAvoidZone.avoidZoneId}</TableCell>
                  <TableCell>{cityAvoidZone.avoidZone.name}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={`/admin/cityAvoidZones/${cityAvoidZone.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(cityAvoidZone.id, (cityAvoidZone.deleted_at) ? POSTACTIONSENUM.SOFTUNDELETE : POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((cityAvoidZone.deleted_at) ? 0.3 : 1) }}>
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(cityAvoidZone.id, POSTACTIONSENUM.DELETE)}>
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

export default withStyles(styles)(CityAvoidZonesTable);
