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
const CandidateDetails = ({loginError, candidateDetails,experience}) => {
    return (
           <div>
              {loginError ? 
             <div>
                <UnauthenticatedNav/> 
                <h1>{loginError}</h1>
            </div>
            : 
            <div>
            <div>
                <EmployerNavBar/>

            </div>
            <div>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={12} md={6}>
             <CandidateDetailsCard candidateDetails={candidateDetails} experience={experience} />
             </Grid>
         </Grid>    
           </div>

          </div>
        

    }
         
      </div>  
    )
}
export default withStyles(styles)(CandidateDetails);