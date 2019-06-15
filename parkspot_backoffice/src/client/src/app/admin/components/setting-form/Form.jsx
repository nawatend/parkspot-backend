/*
Import external libraries
*/
import React, { Component } from "react";
import PropTypes from 'prop-types';

/*
Material UI
*/
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";

import RichEditor from "../rich-editor";

const styles = {
  selectCategories: {
    minWidth: 240
  }
};

class Form extends Component {


  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    //alert(': ' + this.state.value);
    event.preventDefault();
  }

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

  render() {
    const {
      values: { user_id, zoneId, price_per_hour, distance_from_destination, bankcontact, low_emission_zone, underground },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      zones,
      classes
    } = this.props;

    return (
      <form
        onSubmit={(e) => {
          this.props.handleSubmit(e);
        }}
        method="POST"
      >
        <TextField
          id="user_id"
          name="user_id"
          helperText={touched.user_id ? errors.user_id : ""}
          error={touched.user_id && Boolean(errors.user_id)}
          label="User ID"
          value={user_id}
          onChange={this.change.bind(null, "user_id")}
          fullWidth

        />

        <FormControl>
          <InputLabel htmlFor="zoneId">Zone</InputLabel>
          <Select
            className={classes.selectZones}
            value={zoneId}
            onChange={this.change.bind(null, "zone")}
            inputProps={{
              name: 'zoneId',
              id: 'zoneId',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {zones && zones.map((zone, index) => (
              <MenuItem key={zone.id} value={zone.id}>{zone.name}</MenuItem>
            ))}
          </Select>
        </FormControl>


        <TextField
          id="price_per_hour"
          name="price_per_hour"
          helperText={touched.price_per_hour ? errors.price_per_hour : ""}
          error={touched.price_per_hour && Boolean(errors.price_per_hour)}
          label="price_per_hour"
          value={price_per_hour}
          onChange={this.change.bind(null, "price_per_hour")}
          fullWidth
        />
        <TextField
          id="distance_from_destination"
          name="distance_from_destination"
          helperText={touched.distance_from_destination ? errors.distance_from_destination : ""}
          error={touched.distance_from_destination && Boolean(errors.distance_from_destination)}
          label="distance_from_destination"
          value={distance_from_destination}
          onChange={this.change.bind(null, "distance_from_destination")}
          fullWidth
        />


        <TextField
          id="bankcontact"
          name="bankcontact"
          helperText={touched.bankcontact ? errors.bankcontact : ""}
          error={touched.bankcontact && Boolean(errors.bankcontact)}
          label="bankcontact"
          value={bankcontact}
          onChange={this.change.bind(null, "bankcontact")}
          fullWidth
        />


        <TextField
          id="low_emission_zone"
          name="low_emission_zone"
          helperText={touched.low_emission_zone ? errors.low_emission_zone : ""}
          error={touched.low_emission_zone && Boolean(errors.low_emission_zone)}
          label="low_emission_zone"
          value={low_emission_zone}
          onChange={this.change.bind(null, "low_emission_zone")}
          fullWidth
        />



        <TextField
          id="underground"
          name="underground"
          helperText={touched.underground ? errors.underground : ""}
          error={touched.underground && Boolean(errors.underground)}
          label="underground"
          value={underground}
          onChange={this.change.bind(null, "underground")}
          fullWidth
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Submit
              </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Form);