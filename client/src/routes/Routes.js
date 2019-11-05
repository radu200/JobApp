import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../containers/search/JobsPage';
import Candidates from '../containers/search/CandidatesPage';
import CandidateDetails from '../containers/search/CandidateDetails';
import ApplicantsActive from '../containers/jobApplication/ApplicantsActive';
import ApplicantsRejected from '../containers/jobApplication/ApplicantsRejected';
import ApplicantsShortList from '../containers/jobApplication/ApplicantsShortList';
import JobSeekerApplications from '../containers/jobApplication/JobSeekerApplications';
import Chat from '../containers/chat/Chat';


const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Jobs} />
        <Route exact path='/chat' component={Chat} />
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