import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { JobDetailsUrl } from "../../Utils/Paths/UrlPaths";
import { SalaryCurrency, MoreMsg } from "./../../Utils/messages";
import NoJobImage from "../../images/no_job_image.png";
const styles = {
  JobDetails: {
    textDecoration: "none",
    color: "blue"
  },

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },

  heading: {
    opacity: 0.7
  }
};

const JobCard = ({ job, classes }) => {
  return job.map((job, index) => {
    const jobDetailPath = `${JobDetailsUrl}${job.id}`;

    return (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea>
            {job.image ? (
              <CardMedia
                component="img"
                alt={job.category}
                className={classes.media}
                height="140"
                image={job.image}
                title={job.category}
              />
            ) : (
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
              <Typography gutterBottom component="p" color="primary">
                {job.salary ? `${job.salary} ${SalaryCurrency}` : null}
              </Typography>
              <Typography component="p">{job.employment_type}</Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {job.position}
              </Typography>
              <Typography component="p">{job.category}</Typography>
              <Typography noWrap className={classes.heading} component="p">
                {job.description}
              </Typography>
              <Typography component="p">{job.city}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <a className={classes.JobDetails} href={jobDetailPath}>
                {MoreMsg}
              </a>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
};

JobCard.propTypes = {
  classes: PropTypes.object.isRequired,
  SalaryCurrency: PropTypes.string,
  jobDetailPath: PropTypes.string,
  MoreMsg: PropTypes.string,

  job: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      salary: PropTypes.string,
      employment_type: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    })
  )
};

export default withStyles(styles)(JobCard);
