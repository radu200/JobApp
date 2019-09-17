
import React from 'react';
import PropType  from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

slider: {
    display:'flex',
    width: '100%',
    color:"blue"
  },

experienceLabel:{
    opacity:0.8,

},
   
});

const Slider = ({onChange,classes,value,title,min,max,step,valueType}) => {    
    return(
       <div>
        <label className={classes.experienceLabel}>{title}</label>
         <div className={classes.slider}>
          <input 
            type="range" 
            min={min} max={max} 
            value={value} 
            onChange={onChange}
            step={step}/>
            {value} {valueType}
        </div>
      </div>
    )
 }
 Slider.propTypes = {
    onChange:PropType.func.isRequired,
    classes:PropType.object.isRequired,
    value:PropType.string,
    title:PropType.string.isRequired
  }
  
 export default withStyles(styles)(Slider);