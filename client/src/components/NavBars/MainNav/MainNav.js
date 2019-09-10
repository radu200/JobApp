import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import MainSideNav from './MainSideNav'
import BrandName from '../../Utils/BrandName'
import { 
  Profile,
  Settings,
  LogOut,
  SignUpUrlJobSeeker, 
  SignUpUrlEmployer,
  LoginUrl } from '../../Utils/Paths/UrlPaths';



const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  logIn:{
    color:'white',
    textDecoration:'none'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class MainNavBar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes,isAuthenticated } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
      
        <MenuItem  button component="a"  href={Profile}> 
          <p>Profil</p>
        </MenuItem>
        <MenuItem  button component="a"  href={Settings}> 
          <p>Setari</p>
        </MenuItem>
        <Divider/>
         <MenuItem  button component="a"  href={LogOut}> 
          <p>Iesire</p>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
       { isAuthenticated === 'employer' ||  isAuthenticated === 'jobseeker' ?
       <>
       <MenuItem  button component="a"  href={Profile}> 
          <p>Profil</p>
        </MenuItem>
        <MenuItem  button component="a"  href={Settings}> 
          <p>Setari</p>
        </MenuItem>
         <MenuItem  button component="a"  href={LogOut}> 
          <p>Iesire</p>
        </MenuItem>
        </>
         :
        <>   
        
        <MenuItem  button component="a"  href={SignUpUrlEmployer}> 
         <p>Angajeaza</p>
       </MenuItem>
       <MenuItem  button component="a"   href={SignUpUrlJobSeeker}> 
         <p>Inregistrare</p>
       </MenuItem>
        <MenuItem  button component="a" href={LoginUrl}> 
         <p>Logare</p>
       </MenuItem> 
       </>}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <MainSideNav isAuthenticated={isAuthenticated} />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {BrandName}
            </Typography>
            
            <div className={classes.grow} />
            
            <div className={classes.sectionDesktop}>
             
              { isAuthenticated === 'employer' ||  isAuthenticated === 'jobseeker' ?
                <>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  {renderMenu}
                  </> :

                  <>
                  <Button color="inherit"><a  className={classes.logIn}  href={SignUpUrlEmployer}>Angajeaza</a></Button>
                  <Button color="inherit"><a  className={classes.logIn}  href={SignUpUrlJobSeeker}>Inregistrare</a></Button>
                  <Button color="inherit"><a  className={classes.logIn}  href={LoginUrl}>Logare</a></Button>
                  </>
                }
            </div>    
            <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainNavBar);