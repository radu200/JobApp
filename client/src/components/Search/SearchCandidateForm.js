import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../Selects/Locations'
import Categories from '../Selects/Categories'

const errorStyle = {
    fontSize: 12, 
    color: "red"
   }
  

const SearchJobForm = ({
    onSubmit,
    handleInputChange,
    categoryVal,
    errors
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
       <Locations onChange={handleInputChange} />
       <Categories onChange={handleInputChange} categoryVal={categoryVal}/>
       <input type="number" name="experienceMin" min="0" max="50"  onChange={handleInputChange}></input>
       <input type="number" name="experienceMax" min="0" max="50" onChange={handleInputChange}></input>
        <input type="submit"value="submit" />
        
       </form>

       <div style={errorStyle}>
       {errors.locationError}
       {errors.categoryError}
       {errors.experienceMaxError}
       {errors.experienceMinError}
      </div>
    </div>
    )
}


export default SearchJobForm;