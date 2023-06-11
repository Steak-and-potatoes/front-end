import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaMinus } from "react-icons/fa";
import { nanoid } from "nanoid";
import axios from 'axios';
import ErrorModal from '../ErrorModal/ErrorModal.js';
import "./Search.css";
import static_byIngredientsArray from '../../../Data/data-multiple-ingredients.json';

let SERVER = process.env.REACT_APP_SERVER;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryNumber: 2,
      searchByIngredients: [{ query: `${nanoid()}`, text: "Chicken" },{ query: `${nanoid()}`, text: "Butter" }],
      
      byIngredientsArray:static_byIngredientsArray,

      displayError:false,
      error:null
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
    try {
      let regex = /[0-9\W]/g;
      let arrayQueries = this.state.searchByIngredients.filter(object => (object.text!=="" && !regex.test(object.text))).reduce((acc,b)=>{acc.push(b.text.toLowerCase());return acc;},[]);
      if (arrayQueries.length===0){
        this.setState({displayError:true,error:"Must submit one or more ingredients without any digits(123) or special characters(%$&*)."})
      } else {
        let queryString = arrayQueries.map((query,idx) => `ing${idx+1}=${query}`).join("&")
        let url = `${SERVER}/options?${queryString}`
        
        axios.get(url)
          .then(res => this.setState({displayError:false,byIngredientsArray:res.data.meals}))
          .catch(error => this.setState({displayError:true,error:error.message}))
      }
    } catch (error) {
      this.setState({displayError:true,error:error.message})
    }
  }

  render() {
    console.log(this.state.byIngredientsArray);
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
            <FaMinus onClick={() => this.handlerRemoveField(object.query)} />
        </Form.Group>
      );
    });
    return (
      <div className="search-container">

        <ErrorModal 
          error={this.state.error}
          displayError={this.state.displayError} 
          handlerClearError={()=>this.setState({displayError:false,error:null})} />

        <h4>Enter one ingredient per search field and click submit.</h4>
        <Form 
          onSubmit={this.handlerOnSubmit}>
          {formGroups}
          <Button 
            variant="primary" 
            type="submit">
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
