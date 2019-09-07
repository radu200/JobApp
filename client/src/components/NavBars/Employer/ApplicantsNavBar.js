
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LoginUrl }from '../../Utils/Paths/UrlPaths';
import BrandName from '../../Utils/BrandName';
import { SignUpUrlJobSeeker} from '../../Utils/Paths/UrlPaths';
import { SignUpUrlEmployer} from '../../Utils/Paths/UrlPaths';

const styles = {
  root: {
    flexGrow: 1,
  },
  AppBar: {
    background:'#E0E0E0',
    marginTop:20
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

   links:{
    color:'black',
    textDecoration:'none',
    
    
  },
  toolbar:{
    display:'flex',
    flexWrap: 'nowrap'
  
  }
};

function applicantsNavBar(props) {
  const { classes,applicantsNum } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar} >
        <Toolbar className={classes.toolbar} >

          <Button color="inherit"><a  className={classes.links}  href={SignUpUrlEmployer}><p>{applicantsNum}</p>Aplicanti</a></Button>
          <Button color="inherit"><a  className={classes.links}  href={SignUpUrlEmployer}><p>0</p> lista scurta</a></Button>
          <Button color="inherit"><a  className={classes.links}  href={SignUpUrlEmployer}><p>0</p>Respins</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

applicantsNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(applicantsNavBar);
