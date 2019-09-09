import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../.././Selects/Locations'
import Categories from '../.././Selects/Categories'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ExpMsg,SearchMsg,Years } from '../../Utils/messages';


const styles = theme => ({
  button: {
    width:'100%'
  },
  snackbar: {
    margin: theme.spacing.unit,
    color: "red"
  },
  slider: {
    display:'flex',
    width: '100%',
    color:"blue"
  },
ExperienceLabel:{
  opacity:0.8
},
error:{
  fontSize: 16, 
  color: "red",
  paddingBottom:5,
}
});

  

const SearchCandidateForm = ({
    onSubmit,
    handleInputChange,
    handleExperienceValue,
    experienceVal,
    categoryVal,
    locationVal,
    classes,
    errors
  }) => {
  
    
    return(
      <div>
        <form onSubmit={onSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={12}>
                <Locations onChange={handleInputChange} locationVal={locationVal} error={errors.locationError} />
                <Categories onChange={handleInputChange} categoryVal={categoryVal} error={errors.categoryError} />
              </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <label className={classes.ExperienceLabel}>{ExpMsg}</label>
                <div className={classes.slider}>
                  <input 
                    type="range" 
                    min="0" max="50" 
                    value={experienceVal} 
                    onChange={handleExperienceValue}
                    step="1"/>
                    {experienceVal}{Years}    
                </div>
              </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button size="medium" type="submit" variant="contained" color="primary" className={classes.button}>
                   {SearchMsg} </Button>    
              </Grid> 

            </Grid>   
        </form>
    </div>
    )
}

 SearchCandidateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchCandidateForm);