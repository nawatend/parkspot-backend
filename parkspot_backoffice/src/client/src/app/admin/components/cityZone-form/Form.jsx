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

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

  render() {
    const {
      values: { cityId, zoneId },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      categories,
      zones,
      cities,
      classes
    } = this.props;

    return (
      <form
        onSubmit={(e) => {
          this.props.handleSubmit(e);
        }}
        method="POST"
      >

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

        <FormControl>
          <InputLabel htmlFor="cityId">City</InputLabel>
          <Select
            className={classes.selectZones}
            value={cityId}
            onChange={this.change.bind(null, "zone")}
            inputProps={{
              name: 'cityId',
              id: 'cityId',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities && cities.map((city, index) => (
              <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

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