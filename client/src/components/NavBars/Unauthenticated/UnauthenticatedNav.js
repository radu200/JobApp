import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BrandName from '../../Utils/BrandName';
import { LoginUrl }from '../../Utils/Paths/UrlPaths';
import UnauthenticatedSideNav from './UnauthenticatedSideNav';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  logIn:{
    color:'white',
  }
};

function UnauthenticatedNav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <UnauthenticatedSideNav/> 
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {BrandName}
          </Typography>
          <Button color="inherit"><a  className={classes.logIn}  href={LoginUrl}>Logare</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

UnauthenticatedNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnauthenticatedNav);