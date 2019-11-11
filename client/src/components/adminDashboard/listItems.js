import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
       <PeopleIcon />
      </ListItemIcon>
      <Link to='/admin/o2'>All Users</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
       <Link to='/admin/o2/unchecked'>Unchecked Users</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
       <PeopleIcon />
      </ListItemIcon>
      <Link to='/admin/o2/reported'>Reported Users</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to='/admin/o2/blacklist'>BlackList Users</Link>
    </ListItem>
   
  </div>
);

