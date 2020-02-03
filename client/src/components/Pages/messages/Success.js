import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
  },
  text: {
    marginRight: 10,
  },
});

const Success = ({ title, msg }) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            className={classes.title}
            variant="h4"
            component="div"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            className={classes.text}
            variant="subtitle1"
            component="div"
          >
            {msg}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};


Success.propTypes = {
    title:PropTypes.string,
    msg:PropTypes.string
}
export default Success;
