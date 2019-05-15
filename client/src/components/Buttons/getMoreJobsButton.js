import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      width:"100%",
      paddingTop:10,
      paddingBottom:10,
      marginTop:20,
      marginBottom:20,
    },
    input: {
      display: 'none',
    },
   
  });


const GetMoreJobsButton  = ({onClick, classes}) => {
    return(
        <Button variant="outlined"  color="primary" className={classes.button} onClick={onClick}>Mai Mult</Button>
    )
}

GetMoreJobsButton.propTypes = {
    onClick:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired

}
export default withStyles(styles)(GetMoreJobsButton);


