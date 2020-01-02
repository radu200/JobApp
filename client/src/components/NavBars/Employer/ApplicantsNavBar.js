import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1
  },
  AppBar: {
    background: "#E0E0E0",
    marginTop: 20
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  links: {
    color: "black",
    textDecoration: "none"
  },
  toolbar: {
    display: "flex",
    flexWrap: "nowrap"
  }
};

function applicantsNavBar(props) {
  const { classes, jobId } = props;
  const applicantActive = `/job-application/applicants/active/${jobId}`;
  const applicantRejected = `/job-application/applicants/rejected/${jobId}`;
  const applicantShortList = `/job-application/applicants/shortlist/${jobId}`;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={classes.toolbar}>
          <Button color="inherit">
            <Link to={applicantActive}>Aplicanti</Link>
          </Button>
          <Button color="inhz">
          <Link to={applicantShortList}>Lista Scurta</Link>
          </Button>
          <Button color="inherit">
          <Link to={applicantRejected}> Respinsi </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

applicantsNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(applicantsNavBar);
