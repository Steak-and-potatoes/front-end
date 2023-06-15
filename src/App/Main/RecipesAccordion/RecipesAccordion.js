import React from 'react';
import './RecipesAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";

export default class RecipeAccorion extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  
  render () {
      let accordionItems = this.props.recipesArray.map((recipe,idx) =>{
        return (this.props.type==="search"?
                <Accordion.Item 
                  key={idx}
                  eventKey={idx}>
                  <Accordion.Header
                    onClick={()=>this.props.handlerUpdateAccordionKey(idx)}
                    >{recipe.strMeal}</Accordion.Header>
                    <Accordion.Body>
                      <img className="recipe-pic"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                      <Button className="recipe-button"
                        onClick={()=>this.props.handlerFullRecipe(recipe.idMeal)}
                        >View Full Recipe</Button>
                      </Accordion.Body>
                  </Accordion.Item>:
                  <Accordion.Item 
                  key={idx}
                  eventKey={idx}>
                  <Accordion.Header
                    onClick={()=>this.props.handlerUpdateAccordionKey(idx)}
                    >{`${recipe.strMeal||'unavailable'}`}</Accordion.Header>
                    <Accordion.Body>
                      <p>{`Origins: ${recipe.strArea||'unavailable'}`}</p>
                      <p>{`Tags: ${recipe.strTags||'unavailable'}`}</p>
                    <img className="recipe-pic"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                      <Button
                        onClick={()=>this.props.handlerFullRecipe(recipe.idMeal,recipe)}
                        >View Full Recipe</Button>
                      </Accordion.Body>
                  </Accordion.Item>
                  
                
                
        )
      })
      return (
        <div className="accordion-container">
          <Accordion
                  defaultActiveKey={this.props.accordionKey}>
                  {accordionItems}
          </Accordion>
        </div>
      );
  }
}
