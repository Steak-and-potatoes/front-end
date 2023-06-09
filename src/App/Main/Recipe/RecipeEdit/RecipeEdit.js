import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./RecipeEdit.css";
import { withAuth0 } from "@auth0/auth0-react";
import LoadingSymbol from '../LoadingSymbol/LoadingSymbol.js';


class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  handlerDisplaySaveEditButton = () => {
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

  render() {
    // console.log(this.state.fullRecipe);
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
          <Card.Img variant="top" src={this.state.fullRecipe.strMealThumb}/>
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

            {this.handlerDisplayEditButton()}

          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withAuth0(RecipeEdit);
