import React, { Component } from 'react';
import axios from 'axios';
// import JobCard from './card'
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
               const response = await axios.get('/jobs');
               this.setState({jobs:response.data})
               //    console.log(response.data);
              } catch (error) {
                console.error(error);
              }
            }
  
            getJobs()
            
          }
          
          getMoreJobs() {
            
            const getMoreJob =  async () => {
              try {
                const response = await axios.post('/job/get-more',{
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
              {this.state.jobs.map((job,index) => {
                return (
                  <div key={index}>
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