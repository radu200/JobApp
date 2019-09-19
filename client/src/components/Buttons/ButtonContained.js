import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        width:'100%',
        background:'#2552c7',
        color:'#FFFFFF',
        marginBottom:20,
        "&:hover": {
          backgroundColor: "#2552c7",
          opacity:0.9
        }
      },
  });


const ButtonContained =  ({classes,buttonText}) => {
  
    return (<Button 
            variant="contained" 
            type="submit"
            className={classes.button}>
            {buttonText} </Button>)
}

ButtonContained.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles) (ButtonContained);