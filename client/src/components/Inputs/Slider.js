import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root:{
    padding:'10px'
  },
  slider: {
    display: "flex",
    width: "100%",
    color: "blue",
  },

  experienceLabel: {
    opacity: 0.8
  }

});

const Slider = ({
  onChange,
  value,
  title,
  min,
  max,
  step,
  valueType
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <label className={classes.experienceLabel}>{title}</label>
      <div className={classes.slider}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
        />
        {value} {valueType}
      </div>
    </div>
  );
};
Slider.propTypes = {
  onChange: PropType.func,
  classes: PropType.object,
  title: PropType.string
};

export default Slider
