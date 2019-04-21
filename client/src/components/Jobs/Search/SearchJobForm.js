import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../Locations'

const errorStyle = {
    fontSize: 12, 
    color: "red"
   }
  

const SearchJobForm = ({
    onSubmit,
    handleSelectChange, 
    handleSearchValue, 
    QueryVal,
    LocationErrors,
    SearchErrors,
   }) => {
    return(
    <div>
     <form onSubmit={onSubmit}>
        <select onChange={handleSelectChange} >
             <Locations/>
         </select>
            <input 
            type="text" 
            placeholder="Cauta"
            onChange={handleSearchValue} 
            value={QueryVal} />
            <input 
            type="submit"
            value="submit"  
            />
        </form>
        <div>
        {LocationErrors}
        {SearchErrors}
      </div>
    </div>
    )
}



export default SearchJobForm;