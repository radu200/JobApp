import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {SearchMsg } from '.././Utils/messages';

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


const SearchButton =  ({ classes}) => {
  
    return (<Button 
            size="medium" 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button}>
            {SearchMsg} </Button>)
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles) (SearchButton);

