
import React from 'react';
import Header from  './Header/Header.js';
import Main from './Main/Main.js';
import {withAuth0} from "@auth0/auth0-react";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render () {
      return (
        <div className="app-container">
          <Header/>
          <Main/>
        </div>
      );
  }
}

export default withAuth0(App);


