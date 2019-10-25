import React from "react";
import PropType from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  formControl: {
    width: "100%"
  },
  error: {
    fontSize: 16,
    color: "red",
    paddingBottom: 5
  }
});

const TextInput = ({ onChange, classes, value, error, name, title }) => {
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        label={title}
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={value}
        name={name}
      />
      <div className={classes.error}>{error}</div>
    </FormControl>
  );
};
TextInput.propTypes = {
  onChange: PropType.func.isRequired,
  classes: PropType.object.isRequired,
  value: PropType.string,
  error: PropType.string,
  name: PropType.string.isRequired,
  title: PropType.string.isRequired
};

export default withStyles(styles)(TextInput);
