import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import BrandName from '../../Utils/BrandName';
import { Profile }from '../../Utils/Paths/UrlPaths';
import { MyJobs} from '../../Utils/Paths/UrlPaths';
import { SearchCandidate } from '../../Utils/Paths/UrlPaths';
import { Help} from '../../Utils/Paths/UrlPaths';
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class JobSeekerSideNav extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;


    const sideList = (
      <div className={classes.list}>
        <ListItem button component="a" variant='title'>
            <ListItemText primary={BrandName} />
          </ListItem>
        <Divider/>     
        <List>
          <ListItem button component="a" href={Profile}>
            <ListItemText primary="Profil" />
          </ListItem>
          <ListItem button component="a" href={MyJobs}>
            <ListItemText primary="Joburile Mele" />
          </ListItem>
          <ListItem button component="a"  href={SearchCandidate}>
            <ListItemText primary="Cauta candidati" />
          </ListItem>
          <Divider/>
          <ListItem button component="a"  href={Help}>
            <ListItemText primary="Ajutor" />
          </ListItem>
         </List>
      </div>
    );

 
    return (
      <div>
         <IconButton  onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
         </IconButton> 
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

JobSeekerSideNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobSeekerSideNav);