import React from "react";
import axios from "axios";
import "./Recipe.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";
import "./RecipeEditForm.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class RecipeEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: this.props.fullRecipe.strInstructions,
      notes: this.props.fullRecipe.strNotes,
    };
  }

  modifyRecipe = (e, id) => {
    // e.preventDefault();
    console.log(id);

    let idMealUpdate = this.props.fullRecipe.idMeal;
    let strMealUpdate =
      e.target.strMealInput.value || this.props.fullRecipe.strMeal;
    let strCategoryUpdate = this.props.fullRecipe.strCategory;
    let strAreaUpdate =
      e.target.strAreaInput.value || this.props.fullRecipe.strArea;
    let strInstructionsUpdate =
      e.target.strInstructionsInput.value ||
      this.props.fullRecipe.strInstructions;
    let strMealThumbUpdate = this.props.fullRecipe.strMealThumb;
    let strYoutubeUpdate = this.props.fullRecipe.strYoutube;
    let arrayIngredientsUpdate = [];
    arrayIngredientsUpdate =
      this.updateArrayIngredients(e) ||
      arrayIngredientsUpdate.push(...this.props.fullRecipe.arrayIngredients);
    // console.log(arrayIngredients);
    let strUserEmailUpdate = this.props.fullRecipe.strUserEmail;
    let strNotesUpdate =
      e.target.strNotesInput.value || this.props.fullRecipe.strNotes;

    let modifyRecipe = {
      idMeal: idMealUpdate,
      strMeal: strMealUpdate,
      strCategory: strCategoryUpdate,
      strArea: strAreaUpdate,
      strInstructions: strInstructionsUpdate,
      strMealThumb: strMealThumbUpdate,
      strYoutube: strYoutubeUpdate,
      arrayIngredients: arrayIngredientsUpdate,
      strUserEmail: strUserEmailUpdate,
      strNotes: strNotesUpdate,
    };

    this.props.auth0
      .getIdTokenClaims()
      .then((res) => {
        let jwt = res.__raw;
        let config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "put",
          data: modifyRecipe,
          baseURL: process.env.REACT_APP_SERVER,
          url: `/modifyRecipe/${id}`,
        };

        axios(config)
          .then((res) => {
            let modifiedResponseRecipe = res.data;
            // console.log('i think it updated:::', modifiedResponseRecipe);
            this.props.handlerUpdateFullRecipe(modifiedResponseRecipe);
            this.props.handlerFullRecipe(
              modifiedResponseRecipe.idMeal,
              modifiedResponseRecipe
            );
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));

    this.props.closeEditForm(); //remember to add closeEditForm() at the end
  };

  updateArrayIngredients = (e) => {
    let array = [];
    const ingredientNum = this.props.fullRecipe.arrayIngredients.length + 2;
    for (let i = 1; i < ingredientNum; i++) {
      if (i === 1) {
        continue;
      }
      array.push(e.target[i].value);
    }
    return array;
  };

  render() {
    return (
    <Container className="recipe-container">
        <Row className="justify-content-md-center recipe-row">
          <Col className="recipe-col" xs={10}>
                <Card className="recipe-card">
                    <Card.Img 
                        className="recipe-card-image"
                        variant="top" 
                        src={this.props.fullRecipe.strMealThumb} />
                    <Card.Body
                        className="recipe-body">
                    <h3 className="card-head-title">Customize your recipe as you would like:</h3>
                    <Form
                        onSubmit={(e) =>
                        this.modifyRecipe(e, this.props.fullRecipe._id)
                        }
                    >
                        <Card.Title 
                            class="card-title">
                        <Form.Group 
                            className="mb-3" controlId="strMealInput">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                            type="text"
                            defaultValue={this.props.fullRecipe.strMeal}
                            />
                        </Form.Group>
                        </Card.Title>
                        <div>
                        <div className="recipe-head">
                            <Form.Group className="mb-3" controlId="strAreaInput">
                            <Form.Label>Origins:</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={this.props.fullRecipe.strArea}
                            />
                            </Form.Group>
                        </div>

                        {this.props.fullRecipe.arrayIngredients && (
                            <div className="recipe-list">
                            <h4>Ingredients:</h4>
                            <ul>
                                {this.props.fullRecipe.arrayIngredients.map(
                                (ingredient, idx) => {
                                    return (
                                    <li 
                                        className="ingredient-li"
                                        key={idx}>
                                        <Form.Group 
                                        key={idx}
                                        className="mb-3 ingredient-field" controlId={idx}>
                                        <Form.Label>{idx + 1}:</Form.Label>
                                        <Form.Control
                                            className="ingredient-control"
                                            type="text"
                                            defaultValue={ingredient}
                                        />
                                        </Form.Group>
                                    </li>
                                    );
                                }
                                )}
                            </ul>
                            </div>
                        )}

                        <Form.Group className="mb-3" controlId="strInstructionsInput">
                            <Form.Label>Instructions:</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={10}
                            value={this.state.instructions}
                            onChange={(e) =>
                                this.setState({ instructions: e.target.value })
                            }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="strNotesInput">
                            <Form.Label>
                            {this.props.fullRecipe.strNotes
                                ? "Notes:"
                                : "Add Notes ?"}
                            </Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={5}
                            value={this.state.notes}
                            onChange={(e) => this.setState({ notes: e.target.value })}
                            />
                        </Form.Group>
                        </div>
                        <div className="recipe-buttons-container">
                        <Button className="save-button" type="submit">
                            Update Recipe
                        </Button>
                        <Button
                            className="delete-button"
                            onClick={this.props.closeEditForm}
                        >
                            Cancel
                        </Button>
                        </div>
                    </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
  }
}

export default withAuth0(RecipeEditForm);
