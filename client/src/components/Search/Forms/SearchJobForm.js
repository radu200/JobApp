import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SearchMsg,LocMsg } from '../../Utils/messages';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
      width:"100%",
      background:'#2552c7',
      color:'#FFFFFF',
      "&:hover": {
        backgroundColor: "#2552c7",
        opacity:0.9
      }
  },
  searchField: {
    width:'100%'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formControl: {
    marginTop:10,
    width:'100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  error:{
    fontSize: 16, 
    color: "red",
    paddingBottom:5,
  }
});



const SearchJobForm = ({
    onSubmit,
    handleInputChange,
    queryVal,
    errors,
    classes,
    locationVal,
    locations,
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
       <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>
          {LocMsg}
          </InputLabel>
          <Select
            value={locationVal}
             onChange={handleInputChange}
             input={
              <OutlinedInput
                labelWidth={50}
                name="location"
                id="outlined-age-simple"
              />
            }
              
          >
            {locations.map((location,index)=> {
               return <MenuItem key={index} value={location}>{location}</MenuItem>
           })}
          
          </Select>

        </FormControl>
        <div className={classes.error}>
          {errors.locationError}
         </div>
        <TextField
            label={SearchMsg}
            type="search"
            className={classes.searchField}
            margin="normal"
            variant="outlined"
            onChange={handleInputChange} 
            value={queryVal} 
            name="query"
            />
          <div className={classes.error}>
            {errors.searchError}
          </div>
           <Button size="medium" type="submit" variant="contained" color="primary" className={classes.button}>
                {SearchMsg} </Button>  
      </form>

    
    </div>
    )
}


export default withStyles(styles)(SearchJobForm)