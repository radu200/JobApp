
import React, { Component } from 'react';



class SearchResults extends Component {
    constructor(props){
        super(props)
    }
  render() {
     console.log(this.props.jobs)
    return (
      <div >
          
          {/* {this.props.jobs.map((job,index) => {
                return (
                  <div key={index}>
                    <li>{job.id}</li>
                    <li>{job.position}</li>
                    <li>{job.category}</li>
                  </div> )})} */}
      </div>
    );
  }
}




export default SearchResults;