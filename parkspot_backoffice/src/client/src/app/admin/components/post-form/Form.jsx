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
      values: { title, synopsis, body, categoryId, },
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
          id="title"
          name="title"
          helperText={touched.title ? errors.title : ""}
          error={touched.title && Boolean(errors.title)}
          label="Title"
          value={title}
          onChange={this.change.bind(null, "title")}
          fullWidth

        />
        <TextField
          id="synopsis"
          name="synopsis"
          helperText={touched.synopsis ? errors.synopsis : ""}
          error={touched.synopsis && Boolean(errors.synopsis)}
          label="Synopsis"
          fullWidth
          multiline
          rows="4"
          value={synopsis}
          onChange={this.change.bind(null, "synopsis")}

        />

        <TextField
          id="body"
          name="body"
          helperText={touched.body ? errors.body : ""}
          error={touched.body && Boolean(errors.body)}
          label="Body"
          fullWidth
          multiline
          rows="10"
          value={body}
          onChange={this.change.bind(null, "body")}

        />

        <FormControl>
          <InputLabel htmlFor="categoryId">Category</InputLabel>
          <Select
            className={classes.selectCategories}
            value={categoryId}
            onChange={this.change.bind(null, "category")}
            inputProps={{
              name: 'categoryId',
              id: 'categoryId',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories && categories.map((category, index) => (
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