import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../Search/SearchForm'


 class Joblist extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:2

        }
    }
    
    componentDidMount(){
      const getJobs =  async () => {
        try {
               const response = await axios.post('/jobs',{
                offset:0
               });
               this.setState({jobs:response.data})
              } catch (error) {
                console.error(error);
              }
            }
  
            getJobs()
            
          }
          
          getMoreJobs() {
            
            const getMoreJob =  async () => {
              try {
                const response = await axios.post('/jobs',{
                   offset: this.state.offset 
                });
              
                this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 2})
   
              } catch (error) {
                console.error(error);
              }
            }
            
            getMoreJob();
          }
          render() {
            return (
            <div>
              <SearchForm/>
              {this.state.jobs.map((job) => {
                return (
                  <div key={job.id}>
                    <li>{job.id}</li>
                    <li>{job.position}</li>
                    <li>{job.category}</li>
                  </div> )})}
                  <button onClick={this.getMoreJobs.bind(this)}>GetMore</button>
            </div>
           )
        }
  }

export default Joblist