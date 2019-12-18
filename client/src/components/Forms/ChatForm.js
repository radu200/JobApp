import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {Button, TextField}from "@material-ui/core";

const styles = theme => ({
  button: {
    // width: "100%",
    background: "#2552c7",
    color: "#FFFFFF",
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#2552c7",
      opacity: 0.9
    }
  }
});

const createChatRoom = ({onSubmit, classes, value, handleChange }) => {
    return (
        <div>
            <form  onSubmit={onSubmit} >
              <TextField
               name="sendMessage"
               value={value}
               onChange={handleChange}
               label="Outlined" 
               variant="outlined"
              />
              <Button 
               variant="contained" 
               type="submit" 
               className={classes.button}>
                Chat   
              </Button>
            </form>
        </div>
    )
}

export default  withStyles(styles)(createChatRoom);