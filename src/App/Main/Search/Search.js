import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaMinus } from "react-icons/fa";
import { nanoid } from "nanoid";
import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryNumber: 2,
      searchByIngredients: [
        { query: `${nanoid()}`, text: "" },
        { query: `${nanoid()}`, text: "" },
      ],
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

  render() {
    console.log("string is here", this.state.searchByIngredients);
    let formGroups = this.state.searchByIngredients.map((object, idx) => {
      return (
        <Form.Group key={idx} className="mb-3" controlId={object.query}>
          <div className="searchQuery">
            <Form.Control
              type="text"
              name={object.query}
              onChange={this.handlerUpdateForm}
              value={object.text}
              placeholder="ingredient..."
            />

            <FaMinus onClick={() => this.handlerRemoveField(object.query)} />
          </div>
        </Form.Group>
      );
    });
    return (
      <div className="search-container">
        <Form>
          <Form.Label>
            Enter one ingredient per search field and click submit.
          </Form.Label>

          {formGroups}

          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="primary" onClick={this.handlerAddSearchField}>
            Add Ingredient
          </Button>
        </Form>
      </div>
    );
  }
}
