import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult'
import { withRouter } from "react-router-dom";



class SearchJobPosition extends Component {
 constructor (props) {
   super(props);
   this.state = {
      query:'',
      data:[]
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
             const response = await axios.get(`/search?searchJob=${this.state.query}`);
             this.setState({data:response.data})
             this.props.history.push('/search');

            } catch (error) {
              console.error(error);
            }
          }

      getSearchRes()
          
  }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search" onChange={this.handleSearchValue} />
            <input type="submit" value="submit"  />
          </form>
          <SearchResult results={this.state.data}/>
        </div>
      );
    }
}

export default   withRouter(SearchJobPosition);
