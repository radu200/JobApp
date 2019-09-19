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
import { MoreMsg, Years} from '.././Utils/messages';
import RoomIcon from '@material-ui/icons/Room';


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
 },
 RoomIcon:{
  fontSize:17
}

});



const CandidateCard = ({classes, candidate}) => {
  
 
     return candidate.map((candidate) => {
       const candidateDetailsUrl = `/candidate-details/${candidate.userID}`
       return(
               <div key={candidate.userID}>
                 <List className={classes.root} >
                   <Paper  >
                    <ListItem >
                        <Avatar className={classes.bigAvatar} alt={candidate.first_name} src={candidate.avatar} />
                        <ListItemText 
                             primary={
                               <div>
                                <Typography>
                                  {candidate.first_name} {candidate.last_name} 
                                </Typography>
                                <Typography  className={classes.textBold}   color="textPrimary">
                                    {candidate.category} - {candidate.total_ex_years} {Years}
                                 </Typography>
                                 <Typography  className={classes.textAbout}   color="textSecondary">                    
                                  {candidate.position}
                                </Typography>
                                 <Typography  className={classes.textAbout}   color="textSecondary">                    
                                  {candidate.job_seeker_about_me}
                                </Typography>
                                <Typography    color="textSecondary">                    
                                  <RoomIcon  className={classes.RoomIcon}/> {candidate.job_seeker_location}
                                </Typography>
                                <Typography  className={classes.textAbout}   color="textSecondary">                    
                                    <Link className={classes.aboutPage} to={candidateDetailsUrl}>{MoreMsg}</Link>
                                  </Typography>
                               </div>
                            } />
                     </ListItem>
                    </Paper>
                </List>
           </div> 
           )
      } ) 
   }
     



CandidateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  candidateDetailsUrl:PropTypes.string,
  Years:PropTypes.string,
 
  candidate:PropTypes.arrayOf(
    PropTypes.shape({
       userID:PropTypes.number.isRequired,
       first_name:PropTypes.string.isRequired,
       last_name:PropTypes.string.isRequired,
       category:PropTypes.string.isRequired,
       total_ex_years:PropTypes.number.isRequired,
       job_seeker_about_me:PropTypes.string,
       job_seeker_location:PropTypes.string.isRequired,

    })
  )
}
export default  withStyles(styles)(CandidateCard);