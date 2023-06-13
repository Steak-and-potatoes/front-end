import React from 'react';
import './Profile.css';
import RecipesAccordion from '../RecipesAccordion/RecipesAccordion.js';
// import static_databaseRecipes from '../../../Data/data-multiple-user-recipes.json';
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';
import ProfileCard from './ProfileCard/ProfileCard.js';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      accordionKey:null,
      databaseAllRecipes:[],
      username:"Chef Whiskers",
      userEmail:"feline-good@hotmail.com",
      userPicture:'../../Images/amber-kipp-75715CVEJhI-unsplash.jpg'
    }
  }
  componentDidMount() {
    if(this.props.auth0.isAuthenticated){
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          this.setState({username:res.name,userEmail:res.email,userPicture:res.picture})
          const email = res.email;
          const config = {
            headers: {"email":`${email}`},
            method: 'get',
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
    // console.log(this.state);
      return (
        <div className="profile-container">
          {this.props.auth0.isAuthenticated?
            <>
            <ProfileCard 
              displayProfileCard={this.props.displayProfileCard}
              handlerUpdateProfileCard={this.props.handlerUpdateProfileCard}
              username={this.state.username}
              userEmail={this.state.userEmail}
              userPicture={this.state.userPicture}
            />
            <RecipesAccordion
                    type='profile'
                    defaultActiveKey={this.state.accordionKey}
                    recipesArray={this.state.databaseAllRecipes}
                    handlerFullRecipe={this.props.handlerFullRecipe}
                    handlerUpdateAccordionKey={this.handlerUpdateAccordionKey}
                  />
              </>:
              <ProfileCard 
                handlerAttribution={this.props.handlerAttribution}
                displayProfileCard={this.props.displayProfileCard}
                handlerUpdateProfileCard={this.props.handlerUpdateProfileCard}
                username={this.state.username}
                userEmail={this.state.userEmail}
                userPicture={require('../../Images/amber-kipp-75715CVEJhI-unsplash.jpg')}
              />}
        </div>
      );
  }
}

export default withAuth0(Profile);
