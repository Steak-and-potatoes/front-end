# Software Requirements

## Vision

1. What is the vision of the project?

- We want the user to be able to log in and enter ingredients they have and our app will generate multiple recipes the user can choose from. When they choose a recipe it will be put in their personal profile and saved in their "cookbook" or database so they can revisit them whenever they like.

2. What pain point does this project solve?

- This helps users in their everyday life figure out what they can make for breakfast, lunch or dinner with the ingredients they already have in their fridge or pantry.

3. Why should we care about your product?

- You should care because it can help anyone and everyone. Everyone eats and it can be hard to figure out what you can make if you have a random set of ingredients. This product will make life easier for many people. It also can teach you new recipes for the future.

## Scope

**What will your project do**

- Accecpt user ingredients
- Will give recipes to utilize ingredients
- Will save recipes to users personal profile

**What will your project not do**

- It will not allow user to search where to find that dish
- It should not give recipes with extra ingredients you don't have.
- It will not play a video of how to cook dish.

## Minimum Viable Product

1. What will your MVP functionality be?

- Accept multiple ingredients, display multiple recipes, allow user to display one recipe, allow user to save recipe in personal "cookbook" profile, favorite it and add notes.

2. What are your stretch goals?

- Nutritional values for recipe meals, User can share recipes on their social media. Ability to print out the recipe. Search be recipe name.

## Funtional Requirements

**List of functionality**

1. User can search by ingredient

2. User can select and save recipe into profile

3. User can update and delete recipes

4. User can create a cookbook

**Data Flow**

The user will log into our app creating a profile. Then the user will enter the ingredients they have to cook with and choose the recipe they want to make. The recipe with pop up and have directions how to make the meal of their choice. If they like the recipe they can favorite it and add it to their personal cookbook in their profile. User can also add notes if they want to their recipes.

## Non-Functional Requirements

1. Security
2. Usability
3. Maintenance
4. Data Retention

-Data Retention:
The user will be able to make requests to the API. Our site will be able to cache searches and limit those API requests. The data will be stored for user.

-Security:
User data will be secure. Only the user can access and change their own data. Use of .env files will keep API keys safe.