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
    handleSearchLocation, 
    handleSearchCategory,
    handleExperienceMax,
    handleExperienceMin,
    errors
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
       <Locations onChange={handleSearchLocation} />
       <Categories onChange={handleSearchCategory} />
       <input type="number" name="quantity" min="0" max="50"  onChange={handleExperienceMax}></input>
       <input type="number" name="quantity" min="0" max="50" onChange={handleExperienceMin}></input>

        <input 
            type="submit"
            value="submit"  
            />
      </form>

       <div style={errorStyle}>
       {errors.locationError}
       {errors.searchError}
      </div>
    </div>
    )
}

// SearchJobForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   handleSelectChange:PropTypes.func.isRequired,
//   handleSearchValue:PropTypes.func.isRequired,
//   errors:PropTypes.object.isRequired
// }
export default SearchJobForm;