import React, { Component } from 'react';
import Routes from './routes/Routes';
import JobsPage from './containers/Search/JobsPage';

class App extends Component {
  render() {
    return (
      <div className="App">
       {/* <JobsPage/> */}
       <Routes/>
    
      </div>
    );
  }
}


 export default (App);

