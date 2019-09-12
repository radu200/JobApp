import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../containers/Search/JobsPage';
import Candidates from '../containers/Search/CandidatesPage';
import CandidateDetails from '../containers/Search/CandidateDetails';
import ApplicantsActive from '../containers/JobApplication/ApplicantsActive';
import ApplicantsRejected from '../containers/JobApplication/ApplicantsRejected';
import ApplicantsShortList from '../containers/JobApplication/ApplicantsShortList';
import JobSeekerApplications from '../containers/JobApplication/JobSeekerApplications';

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Jobs} />
        <Route exact path='/jobs' component={Jobs} />
        <Route exact path='/candidate-details/:id' component={CandidateDetails} />
        <Route exact path='/search-candidate' component={Candidates} />
        <Route exact path='/job-application/applicants/active/:id' component={ApplicantsActive} />
        <Route exact path='/job-application/applicants/rejected/:id' component={ApplicantsRejected} />
        <Route exact path='/job-application/applicants/shortlist/:id' component={ApplicantsShortList} />
        <Route exact path='/my/applications' component={JobSeekerApplications} />
      </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;