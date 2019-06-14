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


  constructor(props) {
    super(props);
    this.state =
      {
        user_id: '',
        zone: 'city',
        price_per_hour: 0,
        distance_from_destination: 0,
        bankcontact: false,
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
      values: { user_id, zone, zoneId, price_per_hour, distance_from_destination, bankcontact },
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
            {zones && zones.map((category, index) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
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