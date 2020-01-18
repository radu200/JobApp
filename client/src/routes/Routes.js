import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import JobsList from '../containers/search/JobsListContainer';
import JobDetails from '../containers/search/JobDetailsContainer';
import Candidates from '../containers/search/CandidatesContainer';
import Applicants from '../containers/jobApplication/JobApplicants';
import JobSeekerApplications from '../containers/jobApplication/JobSeekerApplications';
import Chat from '../containers/chat/Chat';
import AllUsers from '../containers/adminDashboard/AllUsers'
import Unchecked from '../containers/adminDashboard/UncheckedUsers'
import Reported from '../containers/adminDashboard/ReportedUsers'
import BlackList from '../containers/adminDashboard/BlackListedUsers'
import LoginErr from '../components/Pages/LoginErr'

import Checkout from '../containers/payment/Checkout'

// auth
import  withAuthEmployer  from '../HOC/auth/Employer'
import withAuthJobSeeker  from '../HOC/auth/JobSeeker'
import  withAuthAdmin  from '../HOC/auth/Admin'

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={JobsList} />
        <Route exact path='/jobs' component={JobsList} />
        <Route exact path='/job/details' component={JobDetails} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/search-candidate' component={Candidates} />
        <Route exact path='/job-application/applicants/:status/:id' component={withAuthEmployer(Applicants)} />
        <Route exact path='/my/applications' component={withAuthJobSeeker(JobSeekerApplications)} />
        
        {/* Pages */}
        <Route exact path='/login-err' component={LoginErr} />

        {/* DASHBOARD ADMIN */}
        <Route exact path='/admin/o2' component={withAuthAdmin(AllUsers)} />
        <Route exact path='/admin/o2/unchecked' component={withAuthAdmin(Unchecked)} />
        <Route exact path='/admin/o2/reported' component={withAuthAdmin(Reported)} />
        <Route exact path='/admin/o2/blacklist' component={withAuthAdmin(BlackList)} />
       
        {/* payment */}
        <Route exact path='/checkout' component={withAuthEmployer(Checkout)} />


      </Switch>
   </BrowserRouter>
  </main>
)

export default Routes;