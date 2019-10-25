import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    width: "100%",
    marginBottom: 50
  },
  input: {
    display: "none"
  }
});

const ButtonOutlined = ({ onClick, classes, buttonText }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

ButtonOutlined.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ButtonOutlined);
