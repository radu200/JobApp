import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult'
import { withRouter } from "react-router-dom";



class SearchJobPosition extends Component {
 constructor (props) {
   super(props);
   this.state = {
      query:'',
      data:[],
      limit:2
   }
   this.handleSearchValue = this.handleSearchValue.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
 }
  


  handleSearchValue(event){
    this.setState({query:event.target.value})
  }
  
  handleSubmit(event){
    event.preventDefault();
     
    const getSearchRes =  async () => {
      try {
             const response = await axios.post(`/search?searchJob=${this.state.query}`,{
              limit: this.state.limit
             });
             
             this.setState({data:response.data})
             

            } catch (error) {
              console.error(error);
            }
          }

      getSearchRes()
          
  }

  getMore() {
    const getMoreJob =  async () => {
      try {
        const response = await axios.post(`/search?searchJob=${this.state.query}`,{
          limit: this.state.limit
        });
         this.setState({data:[...response.data], limit:this.state.limit + 2})
      } catch (error) {
        console.error(error);
      }
    }
    
    getMoreJob();
  }

    render() {
      console.log('data',this.state.data)
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search" onChange={this.handleSearchValue} />
            <input type="submit" value="submit"  />
          </form>
          {/* <SearchResult results={this.state.data}/> */}
          <button onClick={this.getMore.bind(this)}>GetMore</button>
          {this.state.data.map((job,index) =>{
            return (
              <div key={index}>{job.position}</div>
            )
          })}
        </div>
      );
    }
}

export default   withRouter(SearchJobPosition);
