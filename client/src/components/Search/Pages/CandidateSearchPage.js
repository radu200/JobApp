import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CandidateCard from '../../Cards/CandidateCard';
import SearchCandidateForm from '../Forms/SearchCandidateForm';
import GetMoreButton from '../../Buttons/getMoreButton'
import EmployerNavBar from '../../NavBars/Employer/EmployerNavBar'
import UnauthenticatedNav from '../../NavBars/Unauthenticated/UnauthenticatedNav'



const notFoundMsg = 'Nu am gasit nici un candidat';
const loginMsg = 'Te rog logheazate';

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
    candidate,
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
              {candidate.length > 0 ? <CandidateCard candidate={candidate} /> : <h1>{notFoundMsg}</h1> }
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>
              {candidate.length > 0 ? <GetMoreButton onClick={onClick}/> : null}
          </Grid>
          </Grid>
        </div>
        </div>
        : 
        <div>
        <UnauthenticatedNav/> 
        <h1>{loginMsg}</h1>
     </div> }
  </div>
  );
}

CandidateSearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CandidateSearchPage);