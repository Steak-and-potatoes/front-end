import React from 'react';
import './Main.css';
import Landing from './Landing/Landing.js';
import Search from './Search/Search.js';
import Recipe from './Recipe/Recipe.js';
import Profile from './Profile/Profile.js';
import {Routes, Route} from 'react-router-dom';
import {withAuth0} from "@auth0/auth0-react";
import axios from 'axios';
import ErrorModal from './ErrorModal/ErrorModal.js';
import static_fullRecipe from '../../Data/data-by-id.json';

let SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fullRecipeID:null,
      fullRecipe:static_fullRecipe,
      displayError:false,
      error:null,
    }
  }

  handlerUpdateFullRecipeId = (id) => {
    if(id!==this.state.fullRecipeID){
      this.setState({fullRecipeID:id});
      let url = `${SERVER}/recipe?id=${id}`;

      axios.get(url)
        .then(res => {
          this.setState({fullRecipe:res.data,displayError:false,error:null})
        })
        .catch(err => this.handlerUpdateError(true,err.message))
    }
  }

  handlerUpdateError = (bool,errorMessage=null) => {
    this.setState({displayError:bool,error:errorMessage})
  }

  render () {
      // console.log(this.state.fullRecipe);
      return (
        <div className="main-container">
            <ErrorModal 
              error={this.state.error}
              displayError={this.state.displayError} 
              handlerUpdateError={()=>this.handlerUpdateError(false,null)} />
          <Routes>
            <Route exact path="/" element={<Landing/>}/>
            <Route exact path="/search" element={
              <Search 
                handlerUpdateFullRecipeID={this.handlerUpdateFullRecipeId}
                handlerUpdateError={this.handlerUpdateError}/>}/>
            <Route exact path="/recipe" element={
              <Recipe 
                fullRecipe={this.state.fullRecipe}
                handlerUpdateError={this.handlerUpdateError}/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      );
  }
}

export default withAuth0(Main);