import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CandidateCard from '../../components/Cards/CandidateCard';
import GetMoreButton from '../../components/Buttons/ButtonOutlined'
import {NoCandFoundMsg} from '../../components/Utils/messages';
import axios from 'axios';
import MainNav from '../../components/NavBars/MainNav/MainNav'
import SelectInput from '../../components/Inputs/Select'
import SearchButton from '../../components/Buttons/ButtonContained';
import Slider from '../../components/Inputs/Slider'
import {Years } from '../../components/Utils/messages';

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

const cities = [
    'Chisinau', 
    'Anenii Noi',
    'Balti',
    'Basarabeasca',
    'Briceni' ,
    'Călărași',
    'Cantemir',
    'Căușeni',
    'Ceadîr-Lunga',
    'Cimișlia',
    'Comrat',
    'Cricova',
    'Criuleni',
    'Dondușeni',
    'Drochia',
    'Dubăsari',
    'Edineț',
    'Fălești',
    'Florești',
    'Glodeni',
    'Hîncești',
    'Ialoveni',
    'Leova',
    'Leuseni',
    'Nisporeni',
    'Ocnița',
    'Orhei',
    'Rezina',
    'Rîbnița',
    'Rîșcani',
    'Sîngerei',
    'Șoldănești',
    'Soroca',
    'Ștefan Vodă',
    'Taraclia',
    'Telenești',
    'Tighina',
    'Tiraspol',
    'Ungheni',
    'Vadul lui Vodă',
    'Vulcănești'
];

const categories = [
    'Barista și Barman',
    'Frumuseţe si Bunastare',
    'Îngrijitorii și sănătatea',
    'Bucatar',
    'Curățenie',
    'Constructie',
    'Sofer',
    'Tehnologie si Inginerie',
    'Educaţie',
    'Evenimente și promovare',
    'Bucătărie portar',
    'Oficiu si Administratre',
    'Vanzari si Marketing',
    'Ospătar sau servitoare',
    'Depozit',
    'Alte'
  ];

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
              }
              
              } catch (error) {
                console.error(error);
              }
          }
        
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
              this.setState({isAuthenticated:data.auth,candidates:[...data.candidates],url, offset:offset + 12})   
            
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
      const { category,experienceMax, candidates, location,formErrors,isAuthenticated} = this.state
      const { handleSubmit,handleInputChange,handleExperienceValue,getMoreCandidates} = this;
      return (
        <div>
          <MainNav isAuthenticated={isAuthenticated}/>
         {isAuthenticated === 'employer'?
          <div className={classes.root} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>  
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={12}>
                          <SelectInput onChange={handleInputChange} value={location} error={formErrors.locationError} elements={cities} title="Locatie" name="location" />
                          <SelectInput onChange={handleInputChange} value={category} error={formErrors.categoryError} elements={categories} title="Categorie" name="category" />
                        </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                          <Slider
                            min='0'
                            max='50'
                            value={experienceMax}
                            onChange={handleExperienceValue}
                            step='1'
                            valueType={Years}
                            title='Experienta'
                          />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                              <SearchButton  buttonText="Cauta"/>
                        </Grid> 
                       </Grid>   
                     </form>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {candidates.length > 0 ? <CandidateCard candidate={candidates} /> : <h1>{NoCandFoundMsg}</h1> }
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {candidates.length >= 12 ? <GetMoreButton onClick={getMoreCandidates}/> : null}
            </Grid>
            </Grid>
          </div> : null }
        </div>
      )
  }
}

export default withStyles(styles)(CandidatesPage);
