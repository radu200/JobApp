import React from "react";
import PropTypes from "prop-types";
import {makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { MoreMsg, Years } from "./../../Utils/messages";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles ({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  root: {
    width: "100%",
  },

  breakWord: {
    wordWrap: "break-word",
    fontWeight: "bold"
  },

  aboutPage: {
    textDecoration: "none",
    color: "blue",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  RoomIcon: {
    fontSize: 17
  }
});

const CandidateCard = ({  candidate, handleCandidateDetails}) => {
  const classes = useStyles()
  return candidate.map(candidate => {
    return (
      <div  onClick={() => handleCandidateDetails(candidate.userID)} key={candidate.userID}>
        <List className={classes.root}>
          <Paper >
            <ListItem>
              <Avatar
                className={classes.bigAvatar}
                alt={candidate.first_name}
                src={candidate.avatar}
              />
              <ListItemText
                primary={
                  <div>
                    <Typography>
                      {candidate.first_name} {candidate.last_name}
                    </Typography>
                    <Typography
                      className={classes.textBold}
                      color="textPrimary"
                    >
                      {candidate.category} - {candidate.total_ex_years} {Years}
                    </Typography>
                    <Typography color="textSecondary">
                      {candidate.position}
                    </Typography>
                    <Typography
                      className={classes.breakWord}
                      color="textSecondary"
                    >
                      {candidate.job_seeker_about_me}
                    </Typography>
                    <Typography color="textSecondary">
                      <RoomIcon className={classes.RoomIcon} />{" "}
                      {candidate.job_seeker_location}
                    </Typography>
                    <Typography
                      className={classes.breakWord}
                      color="textSecondary"
                    >
                      <Link
                        className={classes.aboutPage}
                        to={`/candidate-details/${candidate.userID}`}
                      >
                        {MoreMsg}
                      </Link>
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

CandidateCard.propTypes = {
  classes: PropTypes.object,
  Years: PropTypes.string,

  candidate: PropTypes.arrayOf(
    PropTypes.shape({
      userID: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      category: PropTypes.string,
      total_ex_years: PropTypes.number,
      job_seeker_about_me: PropTypes.string,
      job_seeker_location: PropTypes.string
    })
  )
};
export default CandidateCard
