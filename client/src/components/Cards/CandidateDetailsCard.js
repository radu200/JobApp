import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },

  heading:{
    opacity:0.7
  },

  companyName:{
   color:'black',
   fontWeight:'bold'
  },
  breakText:{
    wordBreak:'break-all'
  }
};


  
const CandidateDetailsCard = ({candidateDetails,experience,classes}) => {
  
  
  
  return(
      <Grid  item xs={12} sm={6} md={4}>
       <Card>
                
                {candidateDetails.map((candidate,index) => {
               return( 
                  <CardActionArea key={index} >
                  <CardMedia
                    component="img"
                    alt={candidate.category}
                    className={classes.media}
                    height="140"
                    image={candidate.avatar}
                    title={candidate.category}
                    />
                  <CardContent>
                  <Typography    gutterBottom component="p" color="primary">
                      {candidate.job_seeker_availability}
                    </Typography>
                    <Typography component="p">
                       {candidate.job_seeker_employment_type}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    {candidate.first_name} {candidate.last_name}
                    </Typography>
                    <Typography component="p" >
                       {candidate.job_seeker_about_me}
                    </Typography>
                    <Typography  noWrap className={classes.heading} component="p">
                       {candidate.description}
                    </Typography>
                    <Typography component="p">
                          {candidate.job_seeker_location}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                )} )}
                {experience.map((experience,index) =>{
                 return (
                  <CardActionArea key={index}>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                    {experience.position}
                    </Typography>
                    <Typography component="p">
                      {experience.category}
                    </Typography>
                       <Typography component="p" className={classes.companyName}>
                      {experience.company_name}
                    </Typography>
                   <Typography    gutterBottom component="p" color="primary">
                      {experience.start_date}- {experience.end_date} - {experience.years} ani {experience.months} luni {experience.days} zile
                    </Typography>
                    <Typography    gutterBottom component="p"  className={classes.wordBreak} >
                      {experience.responsibilities}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                )})}
                   
                </Card>
           </Grid>
        
           )

}

CandidateDetailsCard.propTypes = {
     classes: PropTypes.object.isRequired,
   };

export default withStyles(styles)(CandidateDetailsCard);