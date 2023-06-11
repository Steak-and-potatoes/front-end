import React from 'react';
import './Recipe.css';

export default class Recipe extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render () {
      console.log(this.props.fullRecipe);
      return (
        <div className="recipe-container">
          <p>Recipe Boogers</p>
        </div>
      );
  }
}