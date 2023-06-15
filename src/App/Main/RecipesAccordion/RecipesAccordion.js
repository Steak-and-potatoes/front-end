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
                  className="recipe-accordion-item"
                  key={idx}
                  eventKey={idx}>
                  <Accordion.Header
                    onClick={()=>this.props.handlerUpdateAccordionKey(idx)}
                    >{recipe.strMeal}</Accordion.Header>
                    <Accordion.Body
                      className="recipe-accordion-item-body">
                      <img
                        className="recipe-accordion-image"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                      <div
                        className="recipe-accordion-item-text">
                        {recipe.strMeal&&<p>{recipe.strMeal}</p>}
                        <Button
                          className="save-button"
                          onClick={()=>this.props.handlerFullRecipe(recipe.idMeal,null)}
                          >View Full Recipe</Button>
                      </div>
                      </Accordion.Body>
                  </Accordion.Item>:
                  <Accordion.Item 
                  className="recipe-accordion-item"
                  key={idx}
                  eventKey={idx}>
                  <Accordion.Header
                    onClick={()=>this.props.handlerUpdateAccordionKey(idx)}
                    >{`${recipe.strMeal||'unavailable'}`}</Accordion.Header>
                    <Accordion.Body
                      className="recipe-accordion-item-body">
                      <img
                        className="recipe-accordion-image"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                      <div
                        className="recipe-accordion-item-text">
                        {recipe.strMeal&&<p>{recipe.strMeal}</p>}
                        {recipe.strArea&&<p>{`Origins: ${recipe.strArea}`}</p>}
                        {recipe.strTags&&<p>{`Tags: ${recipe.strTags}`}</p>}
                        <Button
                          className="save-button"
                          onClick={()=>this.props.handlerFullRecipe(recipe.idMeal,recipe)}
                          >View Full Recipe</Button>
                      </div>
                      </Accordion.Body>
                  </Accordion.Item>
                  
                
                
        )
      })
      return (
        <div className="accordion-container">
          <Accordion
                  className="recipe-accordion"
                  defaultActiveKey={this.props.accordionKey}>
                  {accordionItems}
          </Accordion>
        </div>
      );
  }
}
