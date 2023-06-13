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

let SERVER = process.env.REACT_APP_SERVER;


function Main() {
  let [state,setState] = React.useState({
    fullRecipeID:null,
    fullRecipe:static_fullRecipe,
    displayError:false,
    error:null,
  });

  let navigate = useNavigate();

  function handlerFullRecipe(id,object=null) {
    if(id!==state.fullRecipeID && object===null){
          let url = `${SERVER}/recipe?id=${id}`;
          axios.get(url)
            .then(res => {
              console.log(res.data)
              navigate('/recipe');
              setState({fullRecipeID:id,fullRecipe:res.data,displayError:false,error:null});
            })
            .catch(err => handlerUpdateError(true,err.message))
      }
    if (id!==state.fullRecipeID && object) {
        setState({fullRecipe:object})
      }
  }

  function handlerUpdateError(bool,errorMessage=null) {
    setState({displayError:bool,error:errorMessage})
  }

  return (
    <div className="main-container">
      <ErrorModal 
        displayError={state.displayError} 
        error={state.error}
        handlerUpdateError={()=>handlerUpdateError(false,null)} />
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/search" element={
          <Search 
            handlerFullRecipe={handlerFullRecipe}
            handlerUpdateError={handlerUpdateError}/>}/>
        <Route exact path="/recipe" element={
          <Recipe 
            fullRecipe={state.fullRecipe}
            handlerUpdateError={handlerUpdateError}/>}/>
        <Route exact path="/profile" element={
          <Profile
            handlerFullRecipe={handlerFullRecipe}
            handlerUpdateError={handlerUpdateError}
            />}/>
      </Routes>
    </div>
  )
}

export default Main;

// class Main extends React.Component {
//   constructor(props){
//     super(props)
//     this.state={
//       fullRecipeID:null,
//       fullRecipe:static_fullRecipe,
//       displayError:false,
//       error:null,
//     }
//   }

//   handlerFullRecipe = (id,object=null) => {
//     if(id!==this.state.fullRecipeID && object===null){
//           let url = `${SERVER}/recipe?id=${id}`;
//           axios.get(url)
//             .then(res => {
//               this.setState({fullRecipeID:id,fullRecipe:res.data,displayError:false,error:null});
//             })
//             .then(() => browserHistory.push('/recipe'))
//             .catch(err => this.handlerUpdateError(true,err.message))
//       }
//     if (id!==this.state.fullRecipeID && object) {
//         this.setState({fullRecipe:object})
//       }
//   }
  

//   handlerUpdateError = (bool,errorMessage=null) => {
//     this.setState({displayError:bool,error:errorMessage})
//   }

//   render () {
  
//       console.log(this.state.fullRecipe);
//       return (
//         <div className="main-container">
//           <ErrorModal 
//             displayError={this.state.displayError} 
//             error={this.state.error}
//             handlerUpdateError={()=>this.handlerUpdateError(false,null)} />
//           <Routes>
//             <Route exact path="/" element={<Landing/>}/>
//             <Route exact path="/search" element={
//               <Search 
//                 handlerFullRecipe={this.handlerFullRecipe}
//                 handlerUpdateError={this.handlerUpdateError}/>}/>
//             <Route exact path="/recipe" element={
//               <Recipe 
//                 fullRecipe={this.state.fullRecipe}
//                 handlerUpdateError={this.handlerUpdateError}/>}/>
//             <Route exact path="/profile" element={
//               <Profile
//                 handlerFullRecipe={this.handlerFullRecipe}
//                 handlerUpdateError={this.handlerUpdateError}
//                 />}/>
//           </Routes>
//         </div>
//       );
//   }
// }
