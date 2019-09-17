import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CandidateCard from '../../components/Cards/CandidateCard';
import SearchCandidateForm from '../../components/Search/Forms/SearchCandidateForm';
import GetMoreButton from '../../components/Buttons/getMoreButton'
import {NoCandFoundMsg} from '../../components/Utils/messages';
import axios from 'axios';
import MainNav from '../../components/NavBars/MainNav/MainNav'



const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
 
});  


class CandidatesPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            candidates:[],
            offset:0,
            category:'',
            location:'',
            experienceMax:1,
            url:'',
            isAuthenticated:'',
            formErrors:{
              categoryError:'',
              locationError:'',
             
              
            }

        }

     
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleExperienceValue =  this.handleExperienceValue.bind(this)
        }
    

       async  componentDidMount () {
          const searchVal = {location:'Chisinau',category:'Frumusete si Bunastare' ,experienceMax:10}

          const {location, category ,experienceMax} = searchVal;
          const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
          const {offset} = this.state;

            

            try {

              const response = await axios.post(url,{
                offset:offset
              })
              
               const data = response.data
          
               if(data.auth === 'employer'){
                this.setState({isAuthenticated:data.auth,candidates:[...data.candidates],url, offset:offset + 12})   
              } else {
                this.setState({isAuthenticated:''})
              }
              
              } catch (error) {
                console.error(error);
              }
          
          
        }
        1
        getMoreCandidates =  async () => {
          const { url,offset } = this.state
            try {
              const response = await axios.post(url,{
                  offset:offset 
              });
            
              this.setState({candidates:[...this.state.candidates, ...response.data.candidates], offset:offset + 12})
            } catch (error) {
              console.error(error);
            }
          }  
    
    //   //form validation
        validate = () => {
          const {location, category } = this.state;
          
          let categoryError = "";
          let locationError = "";
      
        
          if(!category || category === 'Categoria'){
           categoryError = "Te rog alege categoria"
         
          } else if( category.length > 70) {
         
            categoryError = 'Categoria are  mai mult de 70 de caractere'
         
          }  
          
          if(!location || location === 'Alege Orasul'){
           
            locationError = "Te rog alege orasul"
          
          } else if( location.length > 70) {
            locationError = "Locatia are mai mult de 70 caracatere"

          }

          

          if(categoryError || locationError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError,
                categoryError,
              
              }
            }))
            return false;
          }
            return true;
          
      }
        
      
        handleExperienceValue (event,value) {
          this.setState({experienceMax:event.target.value})
        }    

        handleInputChange(event){
         const target = event.target;
         const value = target.value
         const name = target.name;
         this.setState({
           [name]:value
         })
       
        }


          async handleSubmit(event) {
             
             event.preventDefault();

             const isValid = this.validate();
             const { location, category, experienceMax} = this.state;
        

        if(isValid){
          
            const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
            const offset = 12
            try {

              const response = await axios.post(url,{
                offset:0
              })
              const data = response.data
  
                
              if(data.auth === 'employer'){
              this.setState({isAuthenticated:data.auth,candidates:[...data.candidates],url, offset:offset+12})   
            
              }

            } catch (error) {
              console.error(error);
            }

          
          this.setState(prevState => ({
            formErrors:{
              ...prevState.formErrors,
              locationError:'',
              categoryError:'',
            
            }
          }))

        }
            
    }


                    
  

    render() {
      const { classes} = this.props
      const { category,experienceMax, candidates, formErrors,isAuthenticated} = this.state
      const { handleSubmit,handleInputChange,handleExperienceValue,getMoreCandidates} = this;
      console.log(candidates)
      return (
        <div>
          <MainNav isAuthenticated={isAuthenticated}/>
          <div className={classes.root} >
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={6}>  
                  <SearchCandidateForm
                    onSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleExperienceValue={handleExperienceValue}
                    categoryVal={category}
                    experienceVal={experienceMax}
                    errors={formErrors}
                  />
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item xs={12} sm={12} md={6}>
                {candidates.length > 0 ? <CandidateCard candidate={candidates} /> : <h1>{NoCandFoundMsg}</h1> }
              </Grid>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={6}>
                {candidates.length >= 12 ? <GetMoreButton onClick={getMoreCandidates}/> : null}
            </Grid>
            </Grid>
          </div>
        </div>
      )
  }
}

export default withStyles(styles)(CandidatesPage);
