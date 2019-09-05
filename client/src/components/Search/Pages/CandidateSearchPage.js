import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CandidateSearchCard from '../../Cards/CandidateSearchCard';
import SearchCandidateForm from '../Forms/SearchCandidateForm';
import GetMoreCandidatesButton from '../../Buttons/getMoreCandidatesButton'
import EmployerNavBar from '../../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../../NavBars/Unauthenticated/UnauthenticatedNav'

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
    handleExperienceValue,
    experienceVal,
    categoryVal,
    errors,
    isAuthenticated,
    candidates,
    onClick
  }) => {

  return (
    <div>
    {isAuthenticated  === 'employer' ? 
      <div> 
       <div>
          <EmployerNavBar/>
        </div>
        <div className={classes.root} >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>  
                <SearchCandidateForm
                  onSubmit={onSubmit}
                  handleInputChange={handleInputChange}
                  handleExperienceValue={handleExperienceValue}
                  categoryVal={categoryVal}
                  experienceVal={experienceVal}
                  errors={errors}
                />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={12} md={6}>
              {candidates.length > 0 ? <CandidateSearchCard candidates={candidates} /> : <h1>Nu am gasit nici un candidat</h1> }
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>
              {candidates.length > 0 ? <GetMoreCandidatesButton onClick={onClick}/> : null}
          </Grid>
          </Grid>
        </div>
        </div>
        : 
        <div>
        <UnauthenticatedNav/> 
        <h1>Te rog logheazate</h1>
     </div> }
  </div>
  );
}

CandidateSearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CandidateSearchPage);