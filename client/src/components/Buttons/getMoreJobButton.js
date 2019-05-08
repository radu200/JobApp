import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
   
  });


const GetMoreJobsButton  = ({onclick, classes}) => {
    return(
        <Button variant="outlined"  color="primary" className={classes.button} onClick={onclick}>GetMore</Button>
    )
}

GetMoreJobsButton.propTypes = {
    onclick:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired

}
export default withStyles(styles)(GetMoreJobsButton);


