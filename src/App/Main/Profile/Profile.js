import React from 'react';
import './Profile.css';
import RecipesAccordion from '../RecipesAccordion/RecipesAccordion.js';
// import static_databaseRecipes from '../../../Data/data-multiple-user-recipes.json';
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      accordionKey:null,
      databaseAllRecipes:[]
    }
  }
  componentDidMount() {
    // this.props.auth0.getIdTokenClaims()
    //   .then(res => console.log(res.__raw));

    if(this.props.auth0.isAuthenticated){
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          // const jwt = res.__raw;
          const email = res.email;
          const config = {
            headers: {"email":`${email}`},
            method: 'get',
            // body:{"email":`${email}`},
            baseURL: process.env.REACT_APP_SERVER,
            url: '/recipesAll'
          }
         
          axios(config)
            .then(res => {
              const resRecipes = res.data;
              this.setState({ databaseAllRecipes: resRecipes})
            })
            .catch(err => {
              this.props.handlerUpdateError(true,err.message);
              this.setState({databaseAllRecipes:[]})});

        })
        .catch(err => this.props.handlerUpdateError(true,err.message));
    }
  }


  handlerUpdateAccordionKey = (idx) => {
    this.setState({accordionKey:idx});
  }

  render () {
    console.log(this.state.databaseAllRecipes);
      return (
        <div className="profile-container">
          {this.props.auth0.isAuthenticated?
            <RecipesAccordion
                    type='profile'
                    defaultActiveKey={this.state.accordionKey}
                    recipesArray={this.state.databaseAllRecipes}
                    handlerFullRecipe={this.props.handlerFullRecipe}
                    handlerUpdateAccordionKey={this.handlerUpdateAccordionKey}
                  />:
              null}
        </div>
      );
  }
}

export default withAuth0(Profile);
