import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Joblist from '../components/Jobs/JobsList';
import SearchJob from '../components/Search/SearchJob';

const Routes = () => (
  <main>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Joblist} />
      <Route  path='/search/job' component={SearchJob} />
      <Route exact path='/search/:query/:location' component={SearchJob} />


    </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;