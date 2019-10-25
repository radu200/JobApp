import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  root: {
    marginTop: 10,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  description: {
    wordWrap: "break-word",
    fontWeight: "bold"
  },
  hover: {
    textDecoration: "none",
    "&:hover": {
      color: "grey"
    }
  },
  RoomIcon: {
    fontSize: 17
  }
});

const JobSeekerApplication = ({ classes, job }) => {
  return job.map((job, index) => {
    return (
      <div key={index}>
        <List className={classes.root}>
          <Paper>
            <ListItem>
              <Avatar
                className={classes.bigAvatar}
                alt={job.category}
                src={job.image}
              />
              <ListItemText
                primary={
                  <div>
                    <Typography gutterBottom variant="h6" component="h2">
                      {job.position}
                    </Typography>
                    <Typography>{job.category}</Typography>
                    <Typography component="p">{job.employment_type}</Typography>
                    <Typography component="p">
                      <RoomIcon className={classes.RoomIcon} />
                      {job.city}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          </Paper>
        </List>
      </div>
    );
  });
};

JobSeekerApplication.propTypes = {
  classes: PropTypes.object.isRequired,
  job: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      position: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      employment_type: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    })
  )
};
export default withStyles(styles)(JobSeekerApplication);
