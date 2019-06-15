/*
Import extenal libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/*
Components
*/

/*
Styling
*/
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginPage extends Component {

  constructor() {
    super();
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      formFields: { email: '', password: "" }
    }
  }



  inputChangeHandler(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }

  routeChange() {
    let path = `http://localhost:3000/admin`;
    this.props.history.push(path);
  }

  formHandler = (formFields, e) => {

    e.preventDefault()

    axios.post('http://127.0.0.1:8080/api/v1/login/local', formFields)
      .then(function (response) {
        console.log(response);
        //Perform action based on response
        if (response.token) {
          this.routeChange();
        }
      })
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
  }




  render() {
    const { classes } = this.props;



    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form action="/api/v1/login/local" method="post" className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.email} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.password} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            // onClick={(e) => this.formHandler(this.state.formFields)}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </React.Fragment>
    )
  }


}

export default withStyles(styles)(LoginPage);