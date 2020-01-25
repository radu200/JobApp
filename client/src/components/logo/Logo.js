import React from "react";
import { BrandName } from "./../../Utils/BrandName";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  brandName: {
    color: "#fff",
    backgroundColor: "#f03f3e",
    padding: "10px",
    borderRadius: "10px",
    fontWeight: "bold",
    maxWidth:200,
    margin:5
  },
});
const Logo = () => {
  const classes = styles();
  return (
    <Typography className={classes.brandName} noWrap>
      {BrandName}
    </Typography>
  );
};

export default Logo;
