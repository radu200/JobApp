import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#2552C7",
    "&:hover": {
      backgroundColor: "#2552C7",
      opacity: 0.9,
    },
  },
});

const ButtonContained = ({ classes, buttonText, color, onClick }) => {
  return (
    <Button
      variant="contained"
      color={color ? color : "primary"}
      type="submit"
      className={classes.button}
      onClick={onClick}
    >
      {buttonText}{" "}
    </Button>
  );
};

ButtonContained.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ButtonContained);
