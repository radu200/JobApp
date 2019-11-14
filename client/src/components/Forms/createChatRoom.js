import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    width: "100%",
    background: "#2552c7",
    color: "#FFFFFF",
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#2552c7",
      opacity: 0.9
    }
  }
});

const createChatRoom = ({onSubmit, classes }) => {
    return (
        <div>
            <form onSubmit={onSubmit} >
              <Button variant="contained" type="submit" className={classes.button}>
                Chat   
            </Button>
            </form>
        </div>
    )
}

export default  withStyles(styles)(createChatRoom);