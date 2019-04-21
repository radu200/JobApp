import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../Selects/Locations'

const errorStyle = {
    fontSize: 12, 
    color: "red"
   }
  

const SearchJobForm = ({
    onSubmit,
    handleSelectChange, 
    handleSearchValue, 
    queryVal,
    errors
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
       <Locations onChange={handleSelectChange} />
       <input 
            type="text" 
            placeholder="Cauta"
            onChange={handleSearchValue} 
            value={queryVal} />
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

SearchJobForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSelectChange:PropTypes.func.isRequired,
  handleSearchValue:PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired
}
export default SearchJobForm;