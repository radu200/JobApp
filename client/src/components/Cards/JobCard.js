import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
  
   
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};
const JobCard = ({jobs,classes}) => {

      return jobs.map((job) => {
           return(
               <div key={job.id}>
              
          <Card className={classes.card}>
          <CardActionArea>
          <CardMedia
               component="img"
               alt={job.position}
               className={classes.media}
               height="140"
               image={job.image}
               title={job.category}
               />
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
               {job.position}
               </Typography>
               <Typography component="p">
                    {job.description}
               </Typography>
             </CardContent>
           </CardActionArea>
               <CardActions>
               <Button size="small" color="primary">
               Share
               </Button>
               <Button size="small" color="primary">
               Learn More
               </Button>
            </CardActions>
          </Card>
      </div>
           )
      } )

}

JobCard.propTypes = {
     classes: PropTypes.object.isRequired,
   };

export default withStyles(styles)(JobCard);