import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Joblist from '../components/Jobs/JobsList';
import SearchJobPosition from '../components/Search/SearchJobPosition';

const Routes = () => (
  <main>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Joblist} />
      <Route  path='/search/job' component={SearchJobPosition} />
      <Route exact path='/search/:query/:location' component={SearchJobPosition} />


    </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;