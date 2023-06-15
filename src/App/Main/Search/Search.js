import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaMinus } from "react-icons/fa";
import { nanoid } from "nanoid";
import axios from "axios";
import "./Search.css";
import static_byIngredientsArray from "../../../Data/data-multiple-ingredients.json";
import RecipesAccordion from "../RecipesAccordion/RecipesAccordion.js";
import LoadingSymbol from '../LoadingSymbol/LoadingSymbol.js'

let SERVER = process.env.REACT_APP_SERVER;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryNumber: 2,
      searchByIngredients: [
        { query: `${nanoid()}`, text: "Chicken" },
        { query: `${nanoid()}`, text: "" }
      ],

      byIngredientsArray: static_byIngredientsArray,

      accordionKey: null,
      displayLoadingSymbol:false
    };
  }

  handlerUpdateForm = (event) => {
    let { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      searchByIngredients: prevState.searchByIngredients.map((object) => ({
        ...object,
        text: object.query === name ? value : object.text,
      })),
    }));
  };

  handlerRemoveField = (queryName) => {
    if (this.state.queryNumber <= 1) {
      return;
    } else {
      this.setState((prevState) => ({
        ...prevState,
        queryNumber: prevState.queryNumber - 1,
        searchByIngredients: prevState.searchByIngredients.filter(
          (object) => object.query !== queryName
        ),
      }));
    }
  };

  handlerAddSearchField = () => {
    if (this.state.queryNumber >= 3) {
      return;
    } else {
      let newID = nanoid();
      this.setState((prevState) => ({
        ...prevState,
        queryNumber: prevState.queryNumber + 1,
        searchByIngredients: [
          ...prevState.searchByIngredients,
          { query: `${newID}`, text: "" },
        ],
      }));
    }
  };

  handlerOnSubmit = (event) => {
    event.preventDefault();
    this.setState({displayLoadingSymbol:true});
    try {
      // let regex = /[0-9!@#$%^&*(),.?":{}|<>]/g;
      let regex = /^[a-zA-Z ]*$/;
      let arrayQueries = this.state.searchByIngredients
        .filter((object) => object.text !== "" && regex.test(object.text))
        .reduce((acc, b) => {
          acc.push(b.text.toLowerCase());
          return acc;
        }, []);
      if (arrayQueries.length === 0) {
        this.setState({displayLoadingSymbol:false});
        this.props.handlerUpdateError(
          true,
          "Must submit one or more ingredients without any digits(123) or special characters(%$&*)."
        );
      } else {
        let queryString = arrayQueries
          .map((query, idx) => `ing${idx + 1}=${query}`)
          .join("&");
        let url = `${SERVER}/options?${queryString}`;

        axios
          .get(url)
          .then((res) => {
            if (res.data.meals === null) {
              this.setState({ byIngredientsArray: [], displayLoadingSymbol:false });
              this.props.handlerUpdateError(true, "No search results returned. Please consider ingredient spelling, number of ingredients, and unusual combinations that might not return any results.");
            } else {
              this.props.handlerUpdateError(false, null);
              this.setState({ byIngredientsArray: res.data.meals, displayLoadingSymbol:false });
            }
          })
          .catch((error) => {
            this.setState({displayLoadingSymbol:false});
            this.props.handlerUpdateError(true, error.message);});
      }
    } catch (error) {
      this.setState({displayLoadingSymbol:false});
      this.props.handlerUpdateError(true, error.message);
    }
  };

  handlerUpdateAccordionKey = (idx) => {
    this.setState({ accordionKey: idx });
  };

  render() {
    // console.log(this.state.byIngredientsArray);

    let formGroups = this.state.searchByIngredients.map((object, idx) => {
      return (
        <Form.Group key={idx} className="mb-3" controlId={object.query}>
          <Form.Control
            type="text"
            name={object.query}
            onChange={this.handlerUpdateForm}
            value={object.text}
            placeholder="ingredient..."
          />
          <FaMinus className="minus-ing" onClick={() => this.handlerRemoveField(object.query)} />
        </Form.Group>
      );
    });

    return (
      <div className="search-container">
        <h4>Enter one ingredient per search field then click search.</h4>
        <Form onSubmit={this.handlerOnSubmit}>
          {formGroups}
          <div className="search-buttons">
            <Button className="addButton" onClick={this.handlerAddSearchField}>
              Add Ingredient
            </Button>
            <Button className="searchButton" type="submit">
              Search
            </Button>
          </div>
        </Form>
        <hr />
        <div className="recipes">
          {this.state.byIngredientsArray.length !== 0 && !this.state.displayLoadingSymbol && (
            <RecipesAccordion
              type="search"
              defaultActiveKey={this.state.accordionKey}
              recipesArray={this.state.byIngredientsArray}
              handlerFullRecipe={this.props.handlerFullRecipe}
              handlerUpdateAccordionKey={this.handlerUpdateAccordionKey}
            />
          )}

          {this.state.displayLoadingSymbol &&
            <LoadingSymbol/>}
        </div>
      </div>
    );
  }
}
