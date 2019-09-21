import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NoJobFoundMsg } from './../../Utils/messages';
import JobCard from '../../components/Cards/JobCard';
import GetMoreButton from '../../components/Buttons/ButtonOutlined'
import axios from 'axios';
import MainNav from '../../components/NavBars/MainNav/MainNav'
import SelectInput from '../../components/Inputs/Select'
import SearchButton from '../../components/Buttons/ButtonContained';
import TextInput from '../../components/Inputs/TextInput';
import { connect } from 'react-redux';
import { fetchJobs } from '../../redux/actions/thunks/FetchJobs'
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

 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:0,
            query:'',
            location:'',
            url:'',
            isAuthenticated:'',
            formErrors:{
              searchError:'',
              locationError:''
            }

        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    


    //form validation
        validate = () => {
          const {location, query} = this.state;
          
          let searchError = "";
          let locationError = "";
        
          if(!query){
            searchError = "Nu poate fi gol"
          } else if( query.length > 70){
            searchError = " Te rog nu cauta mai mult de 70 de caractere"

          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          } else if(location.length > 70) {
            locationError = "Locatia are mai mult de 70 caractere"
      
          }

          if(searchError || locationError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError:locationError,
                searchError:searchError
              }
            }))
            return false;
          }
            return true;
      }
        
    componentDidMount(){
      this.props.fetchJobs()            
    }
          
            
           getMoreJobs =  async () => {
              const { url,offset} = this.state
            try {
              const response = await axios.get(url,{
                  offset:offset 
              });
            
              const data = response.data;

              this.setState({jobs:[...this.state.jobs, ...data.jobs], offset:offset + 12})

            } catch (error) {
              console.error(error);
            }
          }
    
      
         handleInputChange (event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState({
              [name]: value
            })
          }

      //submit form  
       async handleSubmit(event) {
            
        event.preventDefault();

        const isValid = this.validate();

        if(isValid){
              const url = `/api/search/job?search_query=${this.state.query}&location=${this.state.location}`
              const offset = 12;
              try {
                const response = await axios.post(url,{
                  offset:0
                })
                  const data = response.data
                  
                  this.setState({jobs:[...data.jobs],url, offset})

              } catch (error) {
                console.error(error);
              }
          
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError:'',
                searchError:''
              }
            }))

        }
    }
              
  render() {  

    const {classes,auth,jobs} = this.props;
    const {query,formErrors,location} = this.state;
    const {handleSubmit,handleInputChange,getMoreJobs} = this;
    return (
      <div>
        <MainNav isAuthenticated={auth}/> 
              <div className={classes.root} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>   
                        <form onSubmit={handleSubmit}>
                          <SelectInput 
                            onChange={handleInputChange} 
                            value={location} 
                            error={formErrors.locationError} 
                            elements={cities} 
                            title="Locatie" 
                            name="location" />
    
                            <TextInput
                                type="search"
                                title="Cauta"
                                onChange={handleInputChange} 
                                value={query} 
                                name="query"
                                error={formErrors.searchError}
                                /> 
                              <SearchButton buttonText='Cauta'/>
                          </form>
                       </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {jobs.length > 0 ? <JobCard job={jobs} /> : <h1>{NoJobFoundMsg}</h1> }
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} >
                        {jobs.length >= 12 ? <GetMoreButton  onClick={getMoreJobs} buttonText='Mai Mult' /> : null}
                      </Grid>
                   </Grid>
              </div>     
          </div>
          )
      }
    }


  
const mapStateToProps = state => ({
    jobs:state.jobs.jobs,
    auth:state.jobs.auth,
})


JobsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  jobs:PropTypes.array.isRequired,
  auth:PropTypes.string.isRequired
};



export default connect(mapStateToProps,{fetchJobs})(withStyles(styles)(JobsPage));