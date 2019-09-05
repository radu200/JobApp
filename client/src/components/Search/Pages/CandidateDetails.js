import React from 'react';
import EmployerNavBar from '../../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../../NavBars/Unauthenticated/UnauthenticatedNav'
import CandidateDetailsCard from '../../Cards/CandidateDetailsCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';


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
const CandidateDetails = ({isAuthenticated , candidateDetails,experience,classes}) => {
    return (
           <div>
            {isAuthenticated === 'employer' ? 
            <div>
              <div>
                  <EmployerNavBar/>

              </div>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6}>
                 <CandidateDetailsCard  candidateDetails={candidateDetails}    experience={experience} />
                </Grid>
            </Grid>    
           </div>

          </div> : 
           
           <div>
              <UnauthenticatedNav/> 
              <h1>Te rog logheazate</h1>
            </div>

           }
         
      </div>  
    )
}
export default withStyles(styles)(CandidateDetails);