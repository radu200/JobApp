import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../containers/Search/JobsPage';
import Candidates from '../containers/Search/CandidatesPage';

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Jobs} />
        <Route exact path='/search-candidate' component={Candidates} />
      </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;