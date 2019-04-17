import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import JobSearchres from './JobSearchRes'
import SelectLocation from './SelectLocation'

const errorStyle = {
  fontSize: 12, 
  color: "red"
 }


class SearchJob extends Component {
 constructor (props) {
   super(props);
   this.state = {
      query:'',
      location:'Alege',
      jobs:[],
      offset:2,
      searchError:'',
      locationError:''
    
   }

    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMore = this.getMore.bind(this);
 }
  


 componentDidMount(){
   this.getJobs();
 }
  
  

  getJobs =  async () => {
  
   try {
    const response = await axios.post(`/search/job?search_query=${this.props.match.params.query}&location=${this.props.match.params.location}`,{
      offset:0
    })
    this.setState({jobs:response.data, query:this.props.match.params.query, location:this.props.match.params.location})
  } catch (error) {
    console.error(error);
  }
} 

  validate = () => {
      let searchError = "";
      let locationError = "";
    
      if(!this.state.query){
        searchError = "Nu poate fi gol"
      }

      if(!this.state.location){
        locationError = "Te rog alege orasul"
      }
      if(searchError || locationError){
        this.setState({searchError,locationError})
        return false;
      }
        return true;
  }

  handleSearchValue(event){
    this.setState({query:event.target.value})
  }
  
  handleSelectChange(event){
    this.setState({location:event.target.value})
  }
 
  handleSubmit(event){
    event.preventDefault();
    const isValid = this.validate();
    
    if(isValid){
      const getSearchRes =  async () => {
        try {
          const response = await axios.post(`/search/job?search_query=${this.state.query}&location=${this.state.location}`,{
            offset:0
          })
          this.setState({jobs:response.data, offset:2})
        } catch (error) {
          console.error(error);
        }
      }
      getSearchRes();
      this.setState({searchError:'', locationError:''})
      this.props.history.push(`/search/job?search_query=${this.state.query}&location=${this.state.location}`)
    } 
    
    
  }


  getMore = async () =>  {
   
      try {
        const response = await axios.post(`/search/job?search_query=${this.state.query}&location=${this.state.location}`,{
          offset: this.state.offset
        });
            this.setState({jobs:[...this.state.jobs,...response.data], offset:this.state.offset + 2})
      } catch (error) {
        console.error(error);
      }
    }
    
  
  
    
    render() {

      const {jobs} = this.state

      let button;
      if( jobs.length > 0){
        button = <button onClick={this.getMore}>GetMore</button>
      } else {
          button = null
      }

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelectChange} >
              <option value={this.state.location}>{this.state.location}</option>
               <SelectLocation/>
             </select>
              <input type="text" placeholder="search" onChange={this.handleSearchValue} />
                <input type="submit" value="submit"  />
                <div style={errorStyle}>
                  {this.state.locationError}
                  {this.state.searchError}
                </div>
          </form>

           <JobSearchres jobs={jobs} />
            {button}
        </div>
        );
   }
}


export default   withRouter(SearchJob);
