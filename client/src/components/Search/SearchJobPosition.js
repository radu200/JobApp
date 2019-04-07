import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";



class SearchJobPosition extends Component {
 constructor (props) {
   super(props);
   this.state = {
      query:'',
      jobs:[],
      offset:2
    
   }
   this.handleSearchValue = this.handleSearchValue.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.getMore =  this.getMore.bind(this);
 }
  


 componentDidMount(){
  const getJobs =  async () => {
    try {
      const response = await axios.post(`/search/job?search_query=${this.props.match.params.query}`,{
        offset:0
      })
      this.setState({jobs:response.data, query:this.props.match.params.query})
    } catch (error) {
      console.error(error);
    }
  } 
  
  getJobs()
 }


  handleSearchValue(event){
    this.setState({query:event.target.value})
  }
  
  handleSubmit(event){
    event.preventDefault();
    
    const getSearchRes =  async () => {
      try {
        const response = await axios.post(`/search/job?search_query=${this.state.query}`,{
          offset:0
        })
        this.setState({jobs:response.data, offset:2})
      } catch (error) {
        console.error(error);
      }
    } 
    
    getSearchRes()
    
    this.props.history.push(`/search/job?search_query=${this.state.query}`)
  }


  getMore() {
   
    const getMoreJob =  async () => {
      try {
        const response = await axios.post(`/search/job?search_query=${this.state.query}`,{
          offset: this.state.offset
        });
            this.setState({jobs:[...this.state.jobs,...response.data], offset:this.state.offset + 2})
      } catch (error) {
        console.error(error);
      }
    }
    
    getMoreJob();
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
          <input type="text" placeholder="search" onChange={this.handleSearchValue} />
            <input type="submit" value="submit"  />
          </form>

          {jobs.length > 0 ?
            jobs.map((job,index) => {
             return(
               <div key={index}>
                    <li>{job.id}</li>
                    <li>{job.position}</li>
                    <li>{job.category}</li>
                  </div>
                  )} ):( <h1>Nu am gasit nici un job</h1>)}
            
            {button}
        </div>
        );
   }
}

export default   withRouter(SearchJobPosition);
