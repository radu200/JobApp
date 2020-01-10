import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "4px",
    padding: "8px 4px",
    display: "flex",
    alignItems: "center",
    width: "99%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const createChatRoom = ({ onSubmit, value, handleChange }) => {
  const classes = useStyles();
  return (
    <>
      <Paper component="form" onSubmit={onSubmit} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Mesaje"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleChange}
          value={value}
        />

        <Divider className={classes.divider} orientation="vertical" />
        <Button type="submit" color="primary" className={classes.button}>
          Trimite
        </Button>
      </Paper>
    </>
  );
};

export default createChatRoom;
