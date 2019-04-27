import React from 'react';
import PropType from 'prop-types'
const categories = ['Frumusete si Bunastare', 'Barman', 'Sofer',"Vinzari" ];

const Categories = ({onChange}) => {

  const Categories = categories.map((categories,index ) => {
    return  <option key={index}>{categories}</option>

  })
   return(
     <select onChange={onChange} >
      <option value="">Alege</option>
      {Categories}
    </select> 
   )
  
   
}

Categories.propType = {
  onChange:PropType.func.isRequired
}

export default Categories;