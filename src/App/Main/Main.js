import React from 'react';
import './Main.css';
import Landing from './Landing/Landing.js';
import Search from './Search/Search.js';
import Recipe from './Recipe/Recipe.js';
import Profile from './Profile/Profile.js';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ErrorModal from './ErrorModal/ErrorModal.js';
import static_fullRecipe from '../../Data/data-by-id.json';
import {useNavigate} from 'react-router-dom';
import AttributionModal from './AttributionModal/AttributionModal.js';
import {useAuth0} from '@auth0/auth0-react';

let SERVER = process.env.REACT_APP_SERVER;


function Main() {
  let [state,setState] = React.useState({
    fullRecipeID:null,
    fullRecipe:static_fullRecipe,
    displayError:false,
    error:null,
    displayProfileCard:true,
    displayAttribution:false,
    attributionObject:{}
  });

  let navigate = useNavigate();
  let auth0 = useAuth0();

  function handlerFullRecipe(id,object=null) {
    if(id!==state.fullRecipeID && object===null){
          let url = `${SERVER}/recipe?id=${id}`;
          axios.get(url)
            .then(res => {
              // console.log(res.data.email)
              navigate('/recipe');
              setState({fullRecipeID:id,fullRecipe:res.data,displayError:false,error:null});
            })
            .catch(err => handlerUpdateError(true,err.message))
      }
    if (id!==state.fullRecipeID && object) {
        navigate('/recipe');
        setState({fullRecipe:object})
      }
  }

  function handlerUpdateError(bool,errorMessage=null) {
    setState({displayError:bool,error:errorMessage})
  }

  function handlerUpdateProfileCard(bool) {
    setState({displayProfileCard:bool});
  }

  function handlerAttribution(object, bool) {
    setState({ attributionObject:object,displayAttribution: bool });
  };

  return (
    <div className="main-container">
            <AttributionModal
              displayAttribution={state.displayAttribution}
              attributionObject={state.attributionObject}
              handlerAttribution={handlerAttribution}
            />
            <ErrorModal 
              displayError={state.displayError} 
              error={state.error}
              handlerUpdateError={()=>handlerUpdateError(false,null)} />
      <Routes>
        <Route exact path="/" element={
            <Landing
              handlerAttribution={handlerAttribution}
            />}/>
        <Route exact path="/search" element={
            <Search 
              handlerFullRecipe={handlerFullRecipe}
              handlerUpdateError={handlerUpdateError}/>}/>
        <Route exact path="/recipe" element={
            <Recipe 
              fullRecipe={state.fullRecipe}
              handlerAttribution={handlerAttribution}
              handlerUpdateError={handlerUpdateError}/>}/>
        {auth0.isAuthenticated &&
          <Route exact path="/profile" element={
            <Profile
              displayProfileCard={state.displayProfileCard}
              handlerUpdateProfileCard={handlerUpdateProfileCard}
              handlerAttribution={handlerAttribution}
              handlerFullRecipe={handlerFullRecipe}
              handlerUpdateError={handlerUpdateError}
              />}/>}
      </Routes>
    </div>
  )
}

export default Main;


