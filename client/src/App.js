import React, { Component } from 'react';
import Joblist from './components/Jobs/JobsList';
import MainNavBar from './components/NavBars/MainNavBar';
import Footer from './components/Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
      
        <MainNavBar/>
       <Joblist/>
       <Footer/>
      </div>
    );
  }
}

export default App;
