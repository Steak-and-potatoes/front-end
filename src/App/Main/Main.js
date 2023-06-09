import React from 'react';
import './Main.css';
import Landing from './Landing/Landing.js';
import Search from './Search/Search.js';
import Recipe from './Recipe/Recipe.js';
import Profile from './Profile/Profile.js';
import {Routes, Route} from 'react-router-dom';

export default class Main extends React.Component {
  render () {
      return (
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<Landing/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/recipe" element={<Recipe/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      );
  }
}