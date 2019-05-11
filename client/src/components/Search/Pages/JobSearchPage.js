import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import JobPageNavBar from '../../NavBars/MainNavBars/JobPageNavBar'
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

  gridCards:{
    display:'flex'
  }
 
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
    queryVal
  }) => {

  return (
  <div>
    <div>
      <JobPageNavBar/>
    </div>
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
      <Grid   container spacing={24}>
        <Grid item xs={12} sm={6} md={4}>
          {jobs.length > 0 ? <JobCard jobs={jobs} /> : <h1>Nu am gasit nici un post de munca</h1> }
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={4}>
          {jobs.length > 0 ? <GetMoreJobsButton onClick={getMoreJobsBtn}/> : null}
       </Grid>
      </Grid>
    </div>
  </div>
  );
}

CandidateSearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(CandidateSearchPage);