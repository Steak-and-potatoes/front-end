import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Recipe.css";
import { withAuth0 } from "@auth0/auth0-react";
import placeholderFullRecipe from "../../../Data/recipe-placeholder.json";
import axios from "axios";
import LoadingSymbol from "../LoadingSymbol/LoadingSymbol.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let dogImageAttribution = {
  creator: "Camylla Battani",
  image: "camylla-battani-JgdgKvYgiwI-unsplash.jpg",
  link: "https://unsplash.com/@camylla93",
};

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullRecipe: this.props.fullRecipe,
      username: "",
      userEmail: "",
      userPicture: "",
      displayLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((res) => {
          this.setState({
            username: res.name || "",
            userEmail: res.email || "",
            userPicture: res.picture || "",
          });
        })
        .catch((err) => this.props.handlerUpdateError(true, err.message));
    } else {
      this.setState({ username: "", userEmail: "", userPicture: "" });
    }
  }

  handlerSaveRecipe = () => {
    if (this.props.auth0.isAuthenticated) {
      this.setState({ displayLoading: true });

      let config = {
        headers: { email: `${this.state.userEmail}` },
        baseURL: process.env.REACT_APP_SERVER,
        url: "/createRecipe",
        data: this.state.fullRecipe,
        method: "post",
      };

      axios(config)
        .then((res) => {
          this.props.handlerFullRecipe(res.data.idMeal, res.data);
          this.setState({ fullRecipe: res.data, displayLoading: false });
        })
        .catch((err) => {
          this.setState({ displayLoading: false });
          this.props.handlerUpdateError(true, err.message);
        });
    }
  };

  handlerDeleteRecipe = () => {
    if (this.props.auth0.isAuthenticated && this.state.fullRecipe._id) {
      this.setState({ displayLoading: true });

      let config = {
        baseURL: process.env.REACT_APP_SERVER,
        url: `/deleteRecipe/${this.state.fullRecipe._id}`,
        method: "delete",
      };

      axios(config)
        .then((res) => {
          this.props.handlerFullRecipe("", placeholderFullRecipe);
          this.setState({
            fullRecipe: placeholderFullRecipe,
            displayLoading: false,
          });
        })
        .catch((err) => {
          this.setState({ displayLoading: false });
          this.props.handlerUpdateError(true, err.message);
        });
    }
  };

  handlerDisplaySaveButton = () => {
    if (
      this.props.auth0.isAuthenticated &&
      !this.state.fullRecipe._id &&
      !this.state.displayLoading
    ) {
      return (
            <Button 
              className="recipe-buttons save-button"
              onClick={this.handlerSaveRecipe} variant="primary">
              Save Recipe
            </Button>
      );
    } else if (
      this.props.auth0.isAuthenticated &&
      !this.state.fullRecipe._id &&
      this.state.displayLoading
    ) {
      return (
            <LoadingSymbol />
      )

    }
  };

  handlerDisplayEditButton = () => {
    if (
      this.props.auth0.isAuthenticated &&
      this.state.fullRecipe._id &&
      !this.state.displayLoading
    ) {
      return (
          <Button 
            className="recipe-buttons edit-button"
            onClick={this.handlerEditRecipe} variant="secondary">
            Edit Recipe
          </Button>
      );
    } else if (
      this.props.auth0.isAuthenticated &&
      this.state.fullRecipe._id &&
      this.state.displayLoading
    ) {
      return <LoadingSymbol />;
    }
  };

  handlerDisplayDeleteButton = () => {
    if (
      this.props.auth0.isAuthenticated &&
      this.state.fullRecipe._id &&
      !this.state.displayLoading
    ) {
      return (
            <Button 
              className="recipe-buttons delete-button"
              onClick={this.handlerDeleteRecipe} variant="warning">
              Delete Recipe
            </Button>
        
      );
    } else if (
      this.props.auth0.isAuthenticated &&
      this.state.fullRecipe._id &&
      this.state.displayLoading
    ) {
      return <LoadingSymbol />;
    }
  };

  render() {
    // console.log(this.state.fullRecipe);
    // console.log(this.props.auth0.isAuthenticated);
    return (
          <Container className="recipe-container">
            <Row className="justify-content-md-center recipe-row">
              <Col className="recipe-col" xs={10}>
                <Card 
                  className="recipe-card">
                  {this.state.fullRecipe.strMealThumb === "dogDonuteImage" ? (
                    <Card.Img
                      className="recipe-card-image"
                      variant="top"
                      onClick={() =>
                        this.props.handlerAttribution(dogImageAttribution, true)
                      }
                      src={require("../../Images/camylla-battani-JgdgKvYgiwI-unsplash.jpg")}
                    />
                  ) : (
                    <Card.Img 
                      variant="top" 
                      className="recipe-card-image"
                      src={this.state.fullRecipe.strMealThumb||""} />
                  )}

                  <Card.Body
                    className="recipe-body">
                    <Card.Title 
                      className="recipe-div">
                      <h2>{this.state.fullRecipe.strMeal}</h2>
                    </Card.Title>
                    <div>
                      <div 
                        className="recipe-div">
                        {this.state.fullRecipe.strArea && (
                          <p>
                            <strong>Origins: </strong>
                            {this.state.fullRecipe.strArea}
                          </p>
                        )}
                        <hr className="hr-recipe"/>
                      </div>


                      {this.state.fullRecipe.arrayIngredients && (
                        <div className="recipe-list recipe-div">
                          <h4>Ingredients:</h4>
                          <ul>
                            {this.state.fullRecipe.arrayIngredients.map(
                              (ingredient, idx) => {
                                return <li key={idx}>{ingredient}</li>;
                              }
                            )}
                          </ul>
                          <hr className="hr-recipe"/>
                        </div>
                      )}
                    

                      {this.state.fullRecipe.strInstructions && (
                        <div className="recipe-instructions recipe-div">
                          <h4>Instructions:</h4>
                          {this.state.fullRecipe.strInstructions
                            .split("\r\n")
                            .map((sentence, idx) => (
                              <p key={idx}>{sentence}</p>
                            ))}
                            <hr className="hr-recipe"/>
                        </div>
                      )}
                    </div>
                    <div className="recipe-buttons-container">
                      {this.state.fullRecipe.strYoutube && (
                          <a
                            className=""
                            href={`${this.state.fullRecipe.strYoutube}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <Button 
                              className="recipe-buttons save-button"
                              variant="primary">
                              Tutorial
                            </Button>
                          </a>
                        )}

                      {this.handlerDisplaySaveButton()}

                      {this.handlerDisplayEditButton()}

                      {this.handlerDisplayDeleteButton()}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
    );
  }
}

export default withAuth0(Recipe);
