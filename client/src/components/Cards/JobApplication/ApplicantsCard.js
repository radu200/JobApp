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
  textAbout:{
     wordWrap: 'break-word',
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
     textDecoration:'underline'
  }
 }

});

const applicantCard = ({classes, applicant}) => {
  
 
     return applicant.map((applicant,index) => {
      const applicantDetailsUrl = `/candidate-details/${applicant.userID}`
       return(
            <div key={index}>
                <List className={classes.root} >
                  <Paper  >
                  <ListItem >
                      <Avatar className={classes.bigAvatar} alt={applicant.first_name} src={applicant.avatar} />
                      <ListItemText 
                            primary={
                              <Typography>
                              {applicant.first_name} {applicant.last_name} 
                              </Typography>
                          }
                            secondary={
                              <React.Fragment>
                              <Typography  className={classes.textBold} component="span"  color="textPrimary">
                                {applicant.category} - {applicant.total_ex_years} ani
                              </Typography>
                              <Typography  className={classes.textAbout} component="span"  color="textSecondary">                    
                                {applicant.job_seeker_about_me}
                              </Typography>
                              <Typography  className={classes.textAbout} component="span"  color="textSecondary">                    
                                {applicant.job_seeker_location}
                              </Typography>
                                <Link className={classes.aboutPage} to={applicantDetailsUrl}>Vezi mai mult</Link>
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
     


applicantCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default  withStyles(styles)(applicantCard);