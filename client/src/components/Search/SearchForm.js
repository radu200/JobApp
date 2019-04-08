
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class SearchForm extends Component {
    constructor(props){
        super(props)
         this.state = {
          query:'',
          location:'Chisinau'
         }
         this.handleSearchValue = this.handleSearchValue.bind(this);
         this.handleSelectChange = this.handleSelectChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this);
       
      }
    
  
 
      handleSearchValue(event){
        this.setState({query:event.target.value})
        
      }
      
      handleSelectChange(event){
        this.setState({location:event.target.value})
      }
      handleSubmit(event){
        event.preventDefault();
        this.props.history.push(`/search/${this.state.query}/${this.state.location}`)
      }
    render() { 
     return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelectChange} >
              <option value="Chisnau">Chisinau</option>
              <option value="Balti">Balti</option>
            </select>
            <input type="text" placeholder="Cauta" onChange={this.handleSearchValue} />
            <input type="submit" value="submit"  />
          </form>
      </div>
    );
  }
}




export default withRouter(SearchForm);