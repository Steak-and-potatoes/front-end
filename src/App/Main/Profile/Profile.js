import React from 'react';
import './Profile.css';
import RecipesAccordion from '../RecipesAccordion/RecipesAccordion.js';
// import static_databaseRecipes from '../../../Data/data-multiple-user-recipes.json';
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';
import ProfileCard from './ProfileCard/ProfileCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      accordionKey:null,
      databaseAllRecipes:[],
      username:"",
      userEmail:"",
      userPicture:"",
      displayProfileCard:true
    }
  }
  componentDidMount() {
    if(this.props.auth0.isAuthenticated){
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          this.setState({username:res.name||"",userEmail:res.email||"",userPicture:res.picture||""})
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
  };

  handlerDisplayProfileCard = (bool) => {
    this.setState({displayProfileCard:bool});
  };

  render () {
      return (
        <Container className="profile-container">
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <ProfileCard 
                displayProfileCard={this.state.displayProfileCard}
                handlerUpdateProfileCard={this.handlerDisplayProfileCard}
                username={this.state.username}
                userEmail={this.state.userEmail}
                userPicture={this.state.userPicture}
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={10}>
              {this.state.databaseAllRecipes.length>0 &&
                <>
                  <h3 className="cookbook-title">Cookbook:</h3>
                  <RecipesAccordion
                      type='profile'
                      defaultActiveKey={this.state.accordionKey}
                      recipesArray={this.state.databaseAllRecipes}
                      handlerFullRecipe={this.props.handlerFullRecipe}
                      handlerUpdateAccordionKey={this.handlerUpdateAccordionKey}
                    />
                </>}
            </Col>
          </Row>
        </Container>
      );
  };
}

export default withAuth0(Profile);
