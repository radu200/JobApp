import React from "react";
import PropType from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  formControl: {
    marginTop: 10,
    width: "100%"
  },

  error: {
    fontSize: 16,
    color: "red",
    paddingBottom: 5
  },
  label: {
    fontSize: 20,
    paddingBottom: 5
  }
});

const SelectInput = ({
  onChange,
  classes,
  value,
  error,
  elements,
  name,
  title
}) => {
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput labelWidth={70} name={name} />
        }>
        {elements.map((element, index) => {
          return (
            <MenuItem key={index} value={element}>
              {element}
            </MenuItem>
          );
        })}
      </Select>
      <div className={classes.error}>{error}</div>
    </FormControl>
  );
};

SelectInput.propTypes = {
  onChange: PropType.func.isRequired,
  classes: PropType.object.isRequired,
  value: PropType.string,
  error: PropType.string,
  elements: PropType.array.isRequired,
  name: PropType.string.isRequired,
  title: PropType.string.isRequired
};

export default withStyles(styles)(SelectInput);
