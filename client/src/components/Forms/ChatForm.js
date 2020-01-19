import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Tooltip from '@material-ui/core/Tooltip';

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
    border:'none',
    outline:'none'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

}));

const ChatForm = ({ onSubmit, value, handleChange }) => {
  const classes = useStyles();
  return (
    <>
      <Paper component="form" onSubmit={onSubmit} className={classes.root}>  
        <TextareaAutosize
          rowsMin={2}
          rowsMax={4}
          className={classes.input}
          placeholder="Mesaje"
          onChange={handleChange}
          value={value}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Button  disabled={value === '' ? true : false}  type="submit" color="primary" className={classes.button}>
          Trimite
        </Button>
      </Paper>
    </>
  );
};

export default ChatForm;
