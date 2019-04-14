
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class SearchForm extends Component {
    constructor(){
        super()
         this.state = {
          query:'',
          location:'',
          searchError:'',
          locationError:''
         }
         this.handleSearchValue = this.handleSearchValue.bind(this);
         this.handleSelectChange = this.handleSelectChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this);
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
      handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validate();

        if(isValid){
          this.props.history.push(`/search/${this.state.query}/${this.state.location}`)
          this.setState({searchError:'', locationError:''})
        }
      }


    render() { 
     return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelectChange} >
             <option value="">Alege</option>
              <option value="Chisnau">Chisinau</option>
              <option value="Balti">Balti</option>
            </select>
            
            <input type="text" placeholder="Cauta" onChange={this.handleSearchValue} value={this.state.query} />
            <input type="submit" value="submit"  />
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.locationError}
            {this.state.searchError}
          </div>
          </form>
      </div>
    );
  }
}




export default withRouter(SearchForm);