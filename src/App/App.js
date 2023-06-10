
import React from 'react';
import Header from  './Header/Header.js';
import Main from './Main/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends React.Component {
  render () {
      return (
        <div className="app-container">
          <Header/>
          <Main/>
        </div>
      );
  }
}


