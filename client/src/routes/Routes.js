import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Joblist from '../components/Jobs/JobsList';
import SearchResults from '../components/Search/SearchResult'
const Routes = () => (
  <main>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Joblist} />
      <Route exact path='/search' component={SearchResults} />

    </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;