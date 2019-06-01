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

  change = (email, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(email, true, false);
  };

  change = (password, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(password, true, false);
  };
  render() {
    const {
      values: { email, password },
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
          id="email"
          name="email"
          helperText={touched.email ? errors.email : ""}
          error={touched.email && Boolean(errors.email)}
          label="E-mail address"
          value={email}
          onChange={this.change.bind(null, "email")}
          fullWidth
        />


        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"

          helperText={touched.password ? errors.password : ""}
          error={touched.password && Boolean(errors.password)}
          value={password}
          autoComplete="current-password"
          onChange={this.change.bind(null, "password")}
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