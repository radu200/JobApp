import React, { Component } from 'react';
import axios from 'axios';
import CandidateDetailsCard from '../../components/Cards/CandidateDetailsCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
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

class CandidateDetails extends Component {

    constructor(props){
        super(props)

         this.state = {
             candidate:[],
             experience:[],
             isAuthenticated:''
         }
    }

    async componentDidMount () {
        
         const id = this.props.match.params.id;
           try {
               const res = await axios.get(`/api/candidate-details/${id}`)
                
               const data = res.data
  
              if(data.auth){
                this.setState({isAuthenticated:data.auth,candidate:data.details, experience:data.experience})   
              } 
           } catch (err){
               console.log(err)
           }

      }

        render(){
            
            const {classes} = this.props;
            const {candidate, experience,isAuthenticated} = this.state;
            return (
                <div>
                  <MainNav isAuthenticated={isAuthenticated}/>
                    <div className={classes.root}>
                        <Grid container spacing={0}>
                          <Grid item xs={12} sm={12} md={6}>
                            <CandidateDetailsCard  candidate={candidate}    experience={experience} />
                          </Grid>
                      </Grid>   
                  </div>
                </div>
            )
        }
}


export default withStyles(styles)(CandidateDetails)