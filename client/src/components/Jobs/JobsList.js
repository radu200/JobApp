import React, { Component } from 'react';
import axios from 'axios';
import JobCard from './card'



 class Joblist extends Component {
  
    constructor(props){
        super(props) 
        this.state = {
            jobs:[]  
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

    render() {

   
      return (
       <div>
        <JobCard  job={this.state.jobs} />

       </div>
     )
    }
  }

export default Joblist