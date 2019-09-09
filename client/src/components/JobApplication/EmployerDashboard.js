import React from 'react';
import EmployerNavBar from '../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../NavBars/Unauthenticated/UnauthenticatedNav'
import CandidateCard from '.././Cards/CandidateCard';
import ApplicantNavBar from '../NavBars/Employer/ApplicantsNavBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { PLsLogInMsg } from '.././Utils/messages';


const styles = theme => ({
  root: {
    maxWidth: 960,
     
  },

});
const EmployerDashboard = ({isAuthenticated,candidate,applicantsNum, classes}) => {
    return (
           <div>
             { isAuthenticated === 'employer' ? 
              <div>
                <div>
                    <EmployerNavBar/>
                </div>
                <div className={classes.root}>
                  <Grid container spacing={0} justify="center" alignItems="center">
                      <Grid item xs={12} sm={12} md={8}>
                        <ApplicantNavBar applicantsNum={applicantsNum} />
                         <CandidateCard candidate={candidate}/>
                      </Grid>
                </Grid>   
                
                </div>             
              </div> :
             <div>
                <UnauthenticatedNav/> 
                <h1>{PLsLogInMsg}</h1>
            </div>
             }
      </div>  
    )
}
export default withStyles(styles)(EmployerDashboard);