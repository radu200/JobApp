
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LoginUrl }from '../../Utils/Paths/UrlPaths';
import UnauthenticatedSideNav from './UnauthenticatedSideNav';
import BrandName from '../../Utils/BrandName';
import { SignUpUrlJobSeeker} from '../../Utils/Paths/UrlPaths';
import { SignUpUrlEmployer} from '../../Utils/Paths/UrlPaths';

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
    textDecoration:'none'
  }
};

function UnauthenticatedNavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <UnauthenticatedSideNav/> 
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {BrandName}
          </Typography>
          <Button color="inherit"><a  className={classes.logIn}  href={SignUpUrlEmployer}>Angajeaza</a></Button>
          <Button color="inherit"><a  className={classes.logIn}  href={SignUpUrlJobSeeker}>Inregistrare</a></Button>
          <Button color="inherit"><a  className={classes.logIn}  href={LoginUrl}>Logare</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

UnauthenticatedNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnauthenticatedNavBar);
