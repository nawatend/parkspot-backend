import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
});

class LoginLayout extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <main className={ classes.main } role="main">
                    { children }
                </main>
            </div>
        )
    }
}
 
export default withStyles(styles)(LoginLayout);