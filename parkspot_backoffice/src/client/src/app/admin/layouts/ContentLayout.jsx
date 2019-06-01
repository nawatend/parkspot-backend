/*
Import external libraries
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/*
Material-UI
*/
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/*
Components
*/

const styles = theme => ({
  tabContent: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: (theme.spacing.unit*2),
    paddingLeft: (theme.spacing.unit*2),
  },
  secondaryBar: {
    zIndex: 0,
  },
});

class ContentLayout extends React.Component {
  static propTypes = {
      classes: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      tabs: PropTypes.array.isRequired,
  };

  activeTab = () => {
    return this.props.tabs.findIndex((tab) => tab.link === this.props.location.pathname);
  };

  render() {
    const { children, classes, tabs, title } = this.props;

    return (
      <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="sticky"
          elevation={0}
          >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                  { title }
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="sticky"
          elevation={0}
        >
          <Tabs value={this.activeTab()} textColor="inherit">
            {tabs && tabs.map((tab, index) => (
              <Tab key={`tab-${index}`} textColor="inherit" label={tab.id} component={Link} to={tab.link} />
            ))}
          </Tabs>
        </AppBar>
        <div className={classes.tabContent}>
          { children }
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(ContentLayout));