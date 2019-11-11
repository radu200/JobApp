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
import ChatRoom from '../containers/chat/ChatRoom';
import AllUsers from '../containers/adminDashboard/AllUsers'
import Unchecked from '../containers/adminDashboard/UncheckedUsers'
import Reported from '../containers/adminDashboard/Reportedusers'
import BlackList from '../containers/adminDashboard/BlackListedUsers'

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Jobs} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/chat/:room' component={ChatRoom} />
        <Route exact path='/jobs' component={Jobs} />
        <Route exact path='/candidate-details/:id' component={CandidateDetails} />
        <Route exact path='/search-candidate' component={Candidates} />
        <Route exact path='/job-application/applicants/active/:id' component={ApplicantsActive} />
        <Route exact path='/job-application/applicants/rejected/:id' component={ApplicantsRejected} />
        <Route exact path='/job-application/applicants/shortlist/:id' component={ApplicantsShortList} />
        <Route exact path='/my/applications' component={JobSeekerApplications} />

        {/* DASHBOARD ADMIN */}
        <Route exact path='/admin/o2' component={AllUsers} />
        <Route exact path='/admin/o2/unchecked' component={Unchecked} />
        <Route exact path='/admin/o2/reported' component={Reported} />
        <Route exact path='/admin/o2/blacklist' component={Unchecked} />
      </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;