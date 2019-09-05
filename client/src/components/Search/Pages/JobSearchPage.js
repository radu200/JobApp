import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UnauthenticatedNav from '../../NavBars/Unauthenticated/UnauthenticatedNav'
import EmployerNavBar from '../../NavBars/Employer/EmployerNavBar'
import JobSeekerNavBar from '../../NavBars/JobSeeker/JobseekerNavBar'

import SearchJobForm from '../Forms/SearchJobForm';
import JobCard from '../../Cards/JobCard';
import GetMoreJobsButton from '../../Buttons/getMoreJobsButton'


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

  const CandidateSearchPage = ({
    classes,
    onSubmit,
    handleInputChange,
    getMoreJobsBtn,
    jobs,
    locationVal,
    locations,
    errors,
    queryVal,
    isAuthenticated
  }) => {

  return (
  <div>
    {isAuthenticated  === 'notAuthenticated' ? 
    <div>
      <UnauthenticatedNav/>
      <div className={classes.root} >
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <SearchJobForm
             onSubmit={onSubmit}
             handleInputChange={handleInputChange}
             queryVal={queryVal}
             locationVal={locationVal}
             errors={errors}
             locations={locations}
           />
          
        </Grid>
      </Grid>
      <Grid container spacing={24}>
          {jobs.length > 0 ? <JobCard jobs={jobs} /> : <h1>Nu am gasit nici un post de munca</h1> }
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12} >
          {jobs.length > 0 ? <GetMoreJobsButton  onClick={getMoreJobsBtn}/> : null}
       </Grid>
      </Grid>
    </div>
    </div> 
      : isAuthenticated === 'jobseeker' ?
   
    <div>
      <JobSeekerNavBar/>
    
        <div className={classes.root} >
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <SearchJobForm
               onSubmit={onSubmit}
               handleInputChange={handleInputChange}
               queryVal={queryVal}
               locationVal={locationVal}
               errors={errors}
               locations={locations}
             />
            
          </Grid>
        </Grid>
        <Grid container spacing={24}>
            {jobs.length > 0 ? <JobCard jobs={jobs} /> : <h1>Nu am gasit nici un post de munca</h1> }
        </Grid>
  
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12} >
            {jobs.length > 0 ? <GetMoreJobsButton  onClick={getMoreJobsBtn}/> : null}
         </Grid>
        </Grid>
      </div>
     </div> 
       : isAuthenticated === 'employer' ? 
      
       <div>
       <EmployerNavBar/>
       <h1>Pagina indisponibila </h1>
      </div>  : null}
  </div>
  );
}

CandidateSearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(CandidateSearchPage);