import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NoJobFoundMsg } from '../../Utils/messages';
import SearchJobForm from '../Forms/SearchJobForm';
import JobCard from '../../Cards/JobCard';
import GetMoreButton from '../../Buttons/getMoreButton'


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
    getMoreJobs,
    jobs,
    locationVal,
    locations,
    errors,
    queryVal,

  }) => {

  return (
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
            {jobs.length > 0 ? <JobCard jobs={jobs} /> : <h1>{NoJobFoundMsg}</h1> }
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12} >
            {jobs.length > 0 ? <GetMoreButton  onClick={getMoreJobs}/> : null}
        </Grid>
        </Grid>
    </div>
  );
}

CandidateSearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(CandidateSearchPage);