
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

if(this.props.results){
const SearchResults = ({results}) => {

      return results.map((job,index)=> {
        return(
        <div key={index}>
         <li>{job.id}</li>
        </div>
    
        )
      })
  }
  

}


export default SearchResults;