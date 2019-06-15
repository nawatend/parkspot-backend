import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, location, withRouter } from 'react-router-dom';

/*
Material-UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import StarIcon from '@material-ui/icons/Stars';
import SettingIcon from '@material-ui/icons/SettingsApplications';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Posts', icon: <PeopleIcon />, link: '/admin/posts' },
      // { id: 'Blogs', icon: <PermMediaOutlinedIcon />, link: '/admin/blogs' },
      // { id: 'Categories', icon: <DnsRoundedIcon />, link: '/admin/categories' },

      { id: 'Countries', icon: <DnsRoundedIcon />, link: '/admin/countries' },
      { id: 'Cities', icon: <DnsRoundedIcon />, link: '/admin/cities' },
      { id: 'Zones', icon: <DnsRoundedIcon />, link: '/admin/zones' },
      { id: 'Users', icon: <PeopleIcon />, link: '/admin/users' },
      { id: 'Favorites', icon: <StarIcon />, link: '/admin/favorites' },
      { id: 'HomeAddresses', icon: <StarIcon />, link: '/admin/homeAddresses' },
      { id: 'AvoidZones', icon: <StarIcon />, link: '/admin/avoidZones' },
      { id: 'Settings', icon: <SettingIcon />, link: '/admin/settings' },
      { id: 'CityZones', icon: <SettingIcon />, link: '/admin/cityZones' },
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 1.7)',
  },
  itemCategory: {
    backgroundColor: '#009980',
    boxShadow: '0 -1px 0 #58b368 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .08)',
    },
  },
  itemActiveItem: {
    color: '#d9d872',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Navigator extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  isActive = (value) => {
    return this.props.location.pathname.indexOf(value) !== -1 ? this.props.classes.itemActiveItem : '';
  };

  render() {
    const { classes, ...other } = this.props;

    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
            PARKSPOT 3.0
          </ListItem>
          <ListItem className={classNames(classes.item, classes.itemCategory)} component={props => <Link to="/admin" {...props} />}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Dashboard
            </ListItemText>
          </ListItem>
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link }) => (
                <ListItem
                  button
                  dense
                  key={childId}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    this.isActive(link),
                  )}
                  component={props => <Link to={link} {...props} />}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navigator));