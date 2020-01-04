import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 1),
    backgroundColor: "#43A048",
    color: "white",
  },
}));

const PaySuccess = () => {
  const classes = useStyles();
  return (
    <>
      <h2> Va multumim ca ne-ati ales pe noi.</h2>
      <p> Comanda dvs. a fost procesat cu succes.</p>
    </>
  );
};

export default PaySuccess;
