import React from 'react';
import PropType from 'prop-types'
const cities = ['chisinau', 'Balti', 'Cahul',"Ungheni" ];

const SelectLocation = ({onChange}) => {

  const locations = cities.map((city,index ) => {
    return  <option key={index}>{city}</option>

  })
   return(
     <select onChange={onChange} name="location" >
      <option value="">Alege</option>
      {locations}
    </select> 
   )
  
   
}

SelectLocation.propType = {
  onChange:PropType.func.isRequired
}

export default SelectLocation;