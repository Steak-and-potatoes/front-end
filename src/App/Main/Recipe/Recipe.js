import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Recipe.css';

export default class Recipe extends React.Component {
  constructor(props){
    super(props);
    this.state={oneRecipe : this.props.fullRecipe}
  }
  render () {
      console.log(this.props.fullRecipe);
      return (
        <div className="recipe-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Card style={{ width: '50rem' }}>
    <Card.Img variant="top" src={this.props.fullRecipe.strMealThumb} />
    <Card.Body>
      <Card.Title>{this.props.fullRecipe.strMeal}</Card.Title>
      <Card.Text>
        {Object.values(this.state.oneRecipe).map((value, index) => (
          <ul key={index}>{value}</ul>
        ))}
      </Card.Text>
      <Button variant="primary">Edit Recipe</Button>
      <Button variant="secondary" style={{ marginLeft: '15px' }}>Save Recipe</Button>
    </Card.Body>
  </Card>
</div>

      );
  }
}