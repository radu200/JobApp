import React from 'react';
import PropType  from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  error:{
    fontSize: 16, 
    color: "red",
    paddingTop:5,
  },
  label:{
    fontSize:20,
    paddingBottom:5,
  
  }
  
});



const categories = ['Categoria','Frumusete si Bunastare', 'Barman', 'Sofer',"Vinzari" ];

const Categories = ({onChange,classes,categoryVal,error}) => {

  const Categories = categories.map((categories,index ) => {
    return  <option key={index}>{categories}</option>

  })
    
   return(
    <FormControl className={classes.margin}>
    <div className={classes.label}>Categorie</div>
      <NativeSelect
        value={categoryVal}
        onChange={onChange}
        input={<BootstrapInput name="category"  />}
        >
      {Categories}
    </NativeSelect>
    <div className={classes.error}>{error}</div>
  </FormControl>
   )
  
   
}

Categories.propType = {
  onChange:PropType.func.isRequired,
  classes:PropType.object.isRequired
}

export default withStyles(styles)(Categories);