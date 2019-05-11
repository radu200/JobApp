import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../.././Selects/Locations'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
      width:"100%"
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
});

const errorStyle = {
    fontSize: 12, 
    color: "red"
   }
  

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
          Locatia
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
        <TextField
            label="Cauta"
            type="search"
            className={classes.searchField}
            margin="normal"
            variant="outlined"
                onChange={handleInputChange} 
                value={queryVal} 
                name="query"
            />
            <Button  type="submit" variant="contained" color="primary" className={classes.button}>
            Cauta
        </Button>
      </form>

       <div style={errorStyle}>
       {errors.locationError}
       {errors.searchError}
      </div>
    </div>
    )
}


export default withStyles(styles) (SearchJobForm)