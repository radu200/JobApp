import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import NoJobImage from "../../images/no_job_image.png";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Loading from '../../Utils/Loading'
import withAuthJobSeeker from '../../HOC/auth/JobSeeker'
const styles = {
  
  card: {
    marginTop:'10px'
  },
};
const JobDetail = ({ 
   job,
   classes,
   handleApplyJob,
   loading,
   appliedJob,
  }) => {
  return (
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
      </CardActionArea>
      <CardActions>
        {loading ? (
          <Loading />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            disabled={appliedJob}
            fullWidth
            onClick={() => handleApplyJob(job.id)}
          >
            {appliedJob ? (
              <Box component="span">Aplicat</Box>
            ) : (
              <Box component="span">Aplica acum</Box>
            )}
          </Button>
        )}

      </CardActions>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {job.position}
          </Typography>
          <Typography gutterBottom component="p" color="textSecondary">
            {job.category}
          </Typography>
          <Typography gutterBottom component="p">
            {job.description}
          </Typography>
          {job.experience && (
            <Typography gutterBottom component="p">
              Experience:
              <Box component="span" fontWeight="fontWeightBold">
                {job.experience}
              </Box>
            </Typography>
          )}
          {job.language && (
            <Typography gutterBottom component="p">
              Limbi:{" "}
              <Box component="span" fontWeight="fontWeightBold">
                {job.language}
              </Box>
            </Typography>
          )}
          {job.employment_type && (
            <Typography gutterBottom component="p">
              Tipul de angajare:
              <Box component="span" fontWeight="fontWeightBold">
                {job.employment_type}
              </Box>
            </Typography>
          )}

          {job.salary && (
            <Typography gutterBottom component="p">
              Salariu:
              <Box component="span" fontWeight="fontWeightBold">
                {job.salary}
              </Box>
            </Typography>
          )}
          {job.salary && (
            <Typography gutterBottom component="p">
              Timpul de începere:{" "}
              <Box component="span" fontWeight="fontWeightBold">
                {job.start_time}
              </Box>
            </Typography>
          )}
          <Typography gutterBottom component="p">
            <Box component="span" fontWeight="fontWeightBold">
              Locatie: {job.city}
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(JobDetail);
