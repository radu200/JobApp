import React from 'react';
import CandidateCard from '.././Cards/CandidateCard';
import ApplicantNavBar from '../NavBars/Employer/ApplicantsNavBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    maxWidth: 960,
     
  },

});
const EmployerDashboard = ({candidate,applicantsNum, classes}) => {
    return (
            
          <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={8}>
                  <ApplicantNavBar applicantsNum={applicantsNum} />
                    <CandidateCard candidate={candidate}/>
                </Grid>
           </Grid>   
          </div>             
              
    )
}
export default withStyles(styles)(EmployerDashboard);