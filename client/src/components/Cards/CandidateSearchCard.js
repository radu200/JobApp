import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  textBold:{
      fontWeight:"bold"
  },
  hover: {
    textDecoration: 'none',
    '&:hover': {
      color: 'grey'
    }
  },
 aboutPage:{
  textDecoration: 'none',
   color:"blue",
  '&:hover': {
    fontWeight:'bold'
  }
 }

});

const JobCard = ({classes, candidates}) => {
  
 
     return candidates.map((candidate) => {
       const candidateDetailsUrl = `/candidate-details/${candidate.userID}`
       return(
               <div key={candidate.userID}>
                 <List className={classes.root} >
                   <Paper  >
                    <ListItem >
                        <Avatar className={classes.bigAvatar} alt={candidate.first_name} src={candidate.avatar} />
                        <ListItemText 
                             primary={
                                <Typography>
                                {candidate.first_name} {candidate.last_name}
                               </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                <Typography  className={classes.textBold} component="span"  color="textPrimary">
                                  {candidate.category} - {candidate.total_ex_years} ani
                                </Typography>
                                  {candidate.job_seeker_about_me}
                                  <Link className={classes.aboutPage} to={candidateDetailsUrl}>Vezi mai mult</Link>
                                </React.Fragment>
                            }
                        />
                     </ListItem>
                    </Paper>
                </List>
           </div> 
           )
      } ) 
   }
     


JobCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default  withStyles(styles)(JobCard);