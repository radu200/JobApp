import React, { Component } from 'react';
import axios from 'axios';
import Locations from './Locations'
import JobCard from './JobCard'


const errorStyle = {
  fontSize: 12, 
  color: "red"
 }


 class Joblist extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:2,
            query:'',
            location:'',
            url:'',
            searchError:'',
            locationError:''

        }

        this.handleSearchValue = this.handleSearchValue.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
      const getJobs =  async () => {
        const url = '/jobs'
        try {
            const response = await axios.post(url,{
            offset:0
            });
            this.setState({jobs:response.data,url})
          } catch (error) {
            console.error(error);
          }
        }
            getJobs()
            
    }
          
            
             getMoreJobs =  async () => {
               const { url } = this.state
              try {
                const response = await axios.post(url,{
                   offset: this.state.offset 
                });
              
                this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 2})
   
              } catch (error) {
                console.error(error);
              }
            }
            
         //form validation
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

          handleSubmit(event) {
            event.preventDefault();


        const isValid = this.validate();

         if(isValid){
              const getSearchRes =  async () => {
                const url = `/search/job?search_query=${this.state.query}&location=${this.state.location}`
                const offset = 2;
                try {
                  const response = await axios.post(url,{
                    offset:0
                  })
                  this.setState({jobs:[...response.data],url, offset})
                } catch (error) {
                  console.error(error);
                }
              }
              getSearchRes();
              this.setState({searchError:'', locationError:''})

            }
          }




          render() {
            const {jobs } = this.state;
            let button;
            if( jobs.length > 0){
              button = <button onClick={this.getMoreJobs}>GetMore</button>
            } else {
                button = null
            }

            return (
              <div>
                <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleSelectChange} >
                      <option value="">Alege</option>
                      <Locations/>
                  </select>
                  <input type="text" placeholder="Cauta" onChange={this.handleSearchValue} value={this.state.query} />
                  <input type="submit" value="submit"  />
                </form>
                {this.state.locationError}
                 {this.state.searchError}
                <JobCard  jobs={this.state.jobs}/>
                {button}

            </div>
           )
        }
  }

export default Joblist