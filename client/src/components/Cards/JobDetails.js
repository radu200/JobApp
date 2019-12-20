import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import NoJobImage from "../../images/no_job_image.png";



const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },

  heading: {
    opacity: 0.7
  },

  card: {
    marginTop: 10
  },

  avatar: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: "auto",
    marginBottom: 0,
    width: 200,
    height: 157,
    borderRadius: 10
  }
};
const JobDetail = ({ job, classes }) => {

  return (
      <Card className={classes.card}>
               <CardActionArea>
                {job.image ? (
                  <CardMedia
                    component="img"
                    alt={''}
                    className={classes.media}
                    height="140"
                    image={job.image}
                    title={job.category}
                  />
                ) : (
                  // no image
                  <CardMedia
                    component="img"
                    alt={job.category}
                    className={classes.media}
                    height="140"
                    image={NoJobImage}
                    title={job.category}
                  />
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    component="p"
                    className={classes.availability}
                  ></Typography>
                </CardContent>
              </CardActionArea>
           
    </Card> 
  ) 
};

export default withStyles(styles)(JobDetail);
