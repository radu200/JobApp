import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MoreMsg} from '.././Utils/messages';

const styles = theme => ({
    button: {
      width:"100%"
    },
    input: {
      display: 'none',
    },
   
  });


const GetMoreButton =  ({onClick, classes}) => {
      
        return (
            <Button variant="outlined"  color="primary" className={classes.button} onClick={onClick}>{MoreMsg}</Button>
            )
}

GetMoreButton.propTypes = {
    onClick:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles) (GetMoreButton);

