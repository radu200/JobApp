import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../.././Selects/Locations'

const errorStyle = {
    fontSize: 12, 
    color: "red"
   }
  

const SearchJobForm = ({
    onSubmit,
    handleInputChange,
    queryVal,
    errors
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
       <Locations onChange={handleInputChange} />
       <input 
            type="text" 
            placeholder="Cauta"
            onChange={handleInputChange} 
            value={queryVal} 
            name="query"
            />
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


export default SearchJobForm;