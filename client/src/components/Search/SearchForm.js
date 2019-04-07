
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class SearchForm extends Component {
    constructor(props){
        super(props)
         this.state = {
          query:''
         }
         this.handleSearchValue = this.handleSearchValue.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
       
      }
    
  
 
      handleSearchValue(event){
        this.setState({query:event.target.value})
      }
      
      handleSubmit(event){
        event.preventDefault();
        this.props.history.push(`/search/${this.state.query}`)
      }
    render() { 
     
     return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Cauta" onChange={this.handleSearchValue} />
            <input type="submit" value="submit"  />
          </form>
      </div>
    );
  }
}




export default withRouter(SearchForm);