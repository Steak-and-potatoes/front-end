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
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                      <Button
                        onClick={()=>this.props.handlerFullRecipe(recipe.idMeal)}
                        >View Full Recipe</Button>
                      </Accordion.Body>
                  </Accordion.Item>:
                  <Accordion.Item 
                  key={idx}
                  eventKey={idx}>
                  <Accordion.Header
                    onClick={()=>this.props.handlerUpdateAccordionKey(idx)}
                    >{`${recipe.strMeal}, Origins: ${recipe.strArea||'Undefined'}, Categories: ${recipe.strTags||'Undefined'}`}</Accordion.Header>
                    <Accordion.Body>
                      <img
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
