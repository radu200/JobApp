import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
  root: {
    padding: "8px 4px",
    display: "flex",
    justifyContent:'center',
    width: "99%",
    fontWeight:'bold',
    position:'fixed',
    zIndex: 999,
 
  },
}));

const ChatHeader= ({ name }) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
         <span>{name}</span>
      </Paper>
    </>
  );
};

export default ChatHeader;
