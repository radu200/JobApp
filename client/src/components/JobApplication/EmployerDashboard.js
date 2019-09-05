import React from 'react';
import EmployerNavBar from '../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../NavBars/Unauthenticated/UnauthenticatedNav'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 800,
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
     
  },

});
const EmployerDashboard = ({loginError, candidateDetails,experience,classes}) => {
    return (
           <div>
              {/* {loginError ?  */}
             <div>
                <UnauthenticatedNav/> 
                {/* <h1>{loginError}</h1> */}
            </div>
            {/* :  */}
            <div>
            <div>
                {/* <EmployerNavBar/> */}

            </div>
            <div className={classes.root}>
              <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={8}>
                </Grid>
            </Grid>    
           </div>

          </div>
        

    {/* } */}
         
      </div>  
    )
}
export default withStyles(styles)(EmployerDashboard);