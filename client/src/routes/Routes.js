import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../components/Jobs/Jobs';

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