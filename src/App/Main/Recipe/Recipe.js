import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Recipe.css";
import { withAuth0 } from "@auth0/auth0-react";
import placeholderFullRecipe from "../../../Data/recipe-placeholder.json";
import axios from 'axios';
import LoadingSymbol from '../LoadingSymbol/LoadingSymbol.js';

let dogImageAttribution = {
  creator: "Camylla Battani",
  image: "camylla-battani-JgdgKvYgiwI-unsplash.jpg",
  link: "https://unsplash.com/@camylla93",
};

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullRecipe: this.props.fullRecipe ||placeholderFullRecipe,
      displayLoading:false
    };
  }

  handlerSaveRecipe = () => {
    if(this.props.auth0.isAuthenticated){
      this.setState({displayLoading:true})

      let config = {
        baseURL:process.env.REACT_APP_SERVER,
        url:'/createRecipe',
        data:this.state.fullRecipe,
        method:'post'
      }

      axios(config)
        .then(res=>this.setState({fullRecipe:res.data,displayLoading:false}))
        .catch(err => {
          this.setState({displayLoading:false});
          this.props.handlerUpdateError(true,err.message);})
    }
  }

  handlerDeleteRecipe = () => {
    if(this.props.auth0.isAuthenticated && this.state.fullRecipe._id){
      this.setState({displayLoading:true})

      let config = {
        baseURL:process.env.REACT_APP_SERVER,
        url:`/deleteRecipe/${this.state.fullRecipe._id}`,
        method:'delete'
      }

      axios(config)
        .then(res=>this.setState({fullRecipe:placeholderFullRecipe,displayLoading:false}))
        .catch(err => {
          this.setState({displayLoading:false});
          this.props.handlerUpdateError(true,err.message);})
    }
  }

  handlerDisplaySaveButton = () => {
    if(this.props.auth0.isAuthenticated && !this.state.fullRecipe._id && !this.state.displayLoading) {
      return <Button 
        onClick={this.handlerSaveRecipe}
        variant="primary">
        Save Recipe
      </Button>
    } else if (this.props.auth0.isAuthenticated && !this.state.fullRecipe._id && this.state.displayLoading){
      return <LoadingSymbol/>
    }
  }

  handlerDisplayEditButton = () => {
    if(this.props.auth0.isAuthenticated && this.state.fullRecipe._id && !this.state.displayLoading) {
      return <Button 
        onClick={this.handlerEditRecipe}
        variant="secondary">
        Edit Recipe
      </Button>
    } else if (this.props.auth0.isAuthenticated && this.state.fullRecipe._id && this.state.displayLoading){
      return <LoadingSymbol/>
    }
  }

  handlerDisplayDeleteButton = () => {
    if(this.props.auth0.isAuthenticated && this.state.fullRecipe._id && !this.state.displayLoading) {
      return <Button 
        onClick={this.handlerDeleteRecipe}
        variant="warning">
        Delete Recipe
      </Button>
    } else if (this.props.auth0.isAuthenticated && this.state.fullRecipe._id && this.state.displayLoading){
      return <LoadingSymbol/>
    }
  }

  render() {
    // console.log(this.state.fullRecipe._id);
    // console.log(this.props.auth0.isAuthenticated);
    return (
      <div
        className="recipe-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "80%" }}>
          {this.state.fullRecipe.strMealThumb === "dogDonuteImage" ? (
            <Card.Img
              variant="top"
              onClick={() =>
                this.props.handlerAttribution(dogImageAttribution, true)
              }
              src={require("../../Images/camylla-battani-JgdgKvYgiwI-unsplash.jpg")}
            />
          ) : (
            <Card.Img variant="top" src={this.state.fullRecipe.strMealThumb} />
          )}

          <Card.Body>
            <Card.Title>
              <h2>{this.state.fullRecipe.strMeal}</h2>
            </Card.Title>
            <div>
              <div className="recipe-head">
                {this.state.fullRecipe.strArea && (
                  <p>
                    <strong>Origins: </strong>
                    {this.state.fullRecipe.strArea}
                  </p>
                )}
                {this.state.fullRecipe.strYoutube && (
                  <a
                    href={`${this.state.fullRecipe.strYoutube}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Button variant="primary" style={{ marginLeft: "15px" }}>
                      Tutorial
                    </Button>
                  </a>
                )}
              </div>

              {this.state.fullRecipe.arrayIngredients && (
                <div className="recipe-list">
                  <h4>Ingredients:</h4>
                  <ul>
                    {this.state.fullRecipe.arrayIngredients.map(
                      (ingredient, idx) => {
                        return <li key={idx}>{ingredient}</li>;
                      }
                    )}
                  </ul>
                </div>
              )}

              {this.state.fullRecipe.strInstructions && (
                <div className="recipe-instructions">
                  <h4>Instructions:</h4>
                  {this.state.fullRecipe.strInstructions
                    .split("\r\n")
                    .map((sentence, idx) => (
                      <p key={idx}>{sentence}</p>
                    ))}
                </div>
              )}
            </div>

            {this.handlerDisplaySaveButton()}

            {this.handlerDisplayEditButton()}

            {this.handlerDisplayDeleteButton()}

          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withAuth0(Recipe);
