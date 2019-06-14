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

  change = (user_id, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(user_id, true, false);
  };

  render() {
    const {
      values: { user_id, address },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      categories,
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
          label="User _id"
          value={user_id}
          onChange={this.change.bind(null, "user_id")}
          fullWidth
        />

        <TextField
          id="address"
          name="address"
          helperText={touched.address ? errors.address : ""}
          error={touched.address && Boolean(errors.address)}
          label="Address"
          value={address}
          onChange={this.change.bind(null, "address")}
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