import React from 'react';
import EmployerNavBar from '../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../NavBars/Unauthenticated/UnauthenticatedNav'
import ApplicantCard from '.././Cards/JobApplication/ApplicantsCard';
import ApplicantNavBar from '../NavBars/Employer/ApplicantsNavBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    // flexGrow: 1,
    maxWidth: 960,
    
    // marginTop: 0,
    // marginRight: 'auto',
    // marginBottom: 0,
    // marginLeft: 'auto',
     
  },

});
const EmployerDashboard = ({isAuthenticated,applicant,applicantsNum, classes}) => {
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
                        <ApplicantNavBar applicantsNum={applicantsNum}/>
                         <ApplicantCard applicant={applicant}/>
                      </Grid>
                </Grid>   
                
                </div>             
              </div> :
             <div>
                <UnauthenticatedNav/> 
                <h1>Te rog logheaza-te</h1>
            </div>
             }
      </div>  
    )
}
export default withStyles(styles)(EmployerDashboard);