import React from "react";
import "./Recipe.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";

class RecipeEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructions: this.props.fullRecipe.strInstructions,
            notes: this.props.fullRecipe.strNotes
        };
    }

    modifyRecipe = (e, id) => {
        e.preventDefault(); //we might want this as it might take us back to the recipe page
        console.log(id);

        let idMeal = this.props.fullRecipe.idMeal;
        let strMeal = e.target.strMealInput.value || this.props.fullRecipe.strMeal;
        let strCategory = this.props.fullRecipe.strCategory;
        let strArea = e.target.strAreaInput.value || this.props.fullRecipe.strArea;
        let strInstructions = e.target.strInstructionsInput.value || this.props.fullRecipe.strInstructions;
        let strMealThumb = this.props.fullRecipe.strMealThumb;
        let strYoutube = this.props.fullRecipe.strYoutube;
        let arrayIngredients = []; arrayIngredients = this.updateArrayIngredients(e) || arrayIngredients.push(...this.props.fullRecipe.arrayIngredients);
        // console.log(arrayIngredients);
        let strUserEmail = this.props.fullRecipe.strUserEmail;
        let strNotes = e.target.strNotesInput.value || this.props.fullRecipe.strNotes;

        
    } //remember to add closeEditForm() at the end

    updateArrayIngredients = (e) => {
        let array = [];
        const ingredientNum = this.props.fullRecipe.arrayIngredients.length + 2;
        for (let i = 1; i < ingredientNum; i++){
            if(i === 1) {continue};
            array.push(e.target[i].value);
        }
        return array;
    }

    render() {
        return (
            <>
                <div
                    className="recipe-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Card style={{ width: "80%" }}>
                        <Card.Img variant="top" src={this.props.fullRecipe.strMealThumb} />
                        <Card.Body>
                            <h5>Customize your recipe as you would like:</h5>
                            <Form onSubmit={(e) => this.modifyRecipe(e, this.props.fullRecipe._id)}>
                                <Card.Title>
                                    <Form.Group className="mb-3" controlId="strMealInput">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control type="text" defaultValue={this.props.fullRecipe.strMeal} />
                                    </Form.Group>
                                </Card.Title>
                                <div>
                                    <div className="recipe-head">
                                        <Form.Group className="mb-3" controlId="strAreaInput">
                                            <Form.Label>Origins:</Form.Label>
                                            <Form.Control type="text" defaultValue={this.props.fullRecipe.strArea} />
                                        </Form.Group>
                                    </div>

                                    {this.props.fullRecipe.arrayIngredients && (
                                        <div className="recipe-list">
                                            <h4>Ingredients:</h4>
                                            <ul>
                                                {this.props.fullRecipe.arrayIngredients.map(
                                                    (ingredient, idx) => {
                                                        return <li key={idx}>
                                                            <Form.Group className="mb-3" controlId={idx}>
                                                                <Form.Label>{idx + 1}:</Form.Label>
                                                                <Form.Control type="text" defaultValue={ingredient} />
                                                            </Form.Group>
                                                        </li>;
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    <Form.Group className="mb-3" controlId="strInstructionsInput">
                                        <Form.Label>Instructions:</Form.Label>
                                        <Form.Control as="textarea" rows={10} value={this.state.instructions} onChange={(e) => this.setState({ instructions: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="strNotesInput">
                                        <Form.Label>{this.props.fullRecipe.strNotes ? "Notes:" : "Add Notes ?"}</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={5} 
                                            value={this.props.fullRecipe.notes ? this.props.fullRecipe.notes : ""} 
                                            onChange={(e) => this.setState({ notes: e.target.value })} />
                                    </Form.Group>
                                </div>
                                <Button
                                    type="submit"
                                >
                                    Update Recipe
                                </Button>
                                <Button
                                // onClick={}
                                >
                                    Cancel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </>
        )
    }
}

export default withAuth0(RecipeEditForm);