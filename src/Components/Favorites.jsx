import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../Components/Favorites.css';

const Favorites = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return <p className="no-favorites-message">No favorite recipes added yet!</p>;
  }

  return (
    <div className="favorites-list fade-in">
      {favorites.map((recipe) => {
        const recipeUrl = `https://www.themealdb.com/meal/${recipe.idMeal}`;

        return (
          <Card key={recipe.idMeal} className="recipe-card mb-3">
            <Card.Img variant="top" src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
            <Card.Body>
              <Card.Title className="recipe-title">{recipe.strMeal}</Card.Title>
              <div className="button-group">
                <Button 
                  variant="danger" 
                  onClick={() => toggleFavorite(recipe)} 
                  className="favorite-button"
                >
                  <FontAwesomeIcon icon={faTrash} className="icon" />
                  Remove from Favorites
                </Button>
                <Button 
                  variant="primary" 
                  href={recipeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 view-recipe-button"
                >
                  View Recipe
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Favorites;
