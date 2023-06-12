import React from 'react';
import './Profile.css';
import RecipesAccordion from '../RecipesAccordion/RecipesAccordion.js';
import static_databaseRecipes from '../../../Data/data-multiple-user-recipes.json';

export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      accordionKey:null,
      databaseAllRecipes:static_databaseRecipes
    }
  }

  handlerUpdateAccordionKey = (idx) => {
    this.setState({accordionKey:idx});
  }

  render () {
    // console.log(this.state.databaseAllRecipes);
      return (
        <div className="profile-container">
          {this.state.databaseAllRecipes.length>0?
          <RecipesAccordion
                  type='profile'
                  defaultActiveKey={this.state.accordionKey}
                  recipesArray={this.state.databaseAllRecipes}
                  handlerFullRecipe={this.props.handlerFullRecipe}
                  handlerUpdateAccordionKey={this.handlerUpdateAccordionKey}
                />:
            null}
        </div>
      );
  }
}
