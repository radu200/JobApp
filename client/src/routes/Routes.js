import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../containers/Jobs/JobsPage';

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Jobs} />
      </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;