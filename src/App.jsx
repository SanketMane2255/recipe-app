

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';

import RecipeList from './Components/RecipeList';
import SearchBar from './Components/SearchBar';
import Favorites from './Components/Favorites';
import FilterModal from './Components/FilterModal';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
    
const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput || ''}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [searchInput]);

  // Fetching cuisines and ingredients
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const cuisinesResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
        );
        setCuisines(cuisinesResponse.data.meals.map(meal => meal.strArea));
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const ingredientsResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
        );
        setIngredients(ingredientsResponse.data.meals.map(meal => meal.strIngredient));
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchCuisines();
    fetchIngredients();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.idMeal !== recipe.idMeal)
      : [...favorites, recipe];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

  // Filtering recipes based on selected ingredients and cuisines
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(recipe.strArea);
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.every(ingredient => 
        recipe.strIngredient && recipe.strIngredient.includes(ingredient)
      );

    return matchesCuisine && matchesIngredients;
  });

  
    return (
      <Router>
        <div className="app fade-in">
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Navbar.Brand href="/">DeliciousMeal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
              <div className="mx-auto search-bar">
                <SearchBar setSearchInput={setSearchInput} />
              </div>
              <Nav className="ml-auto">
                <Nav.Link href="/" className="text-light">Home</Nav.Link>
                <Nav.Link href="/favorites" className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faHeart} className="text-danger" />
                  {favorites.length > 0 && (
                    <Badge pill variant="light" className="ml-2">
                      {favorites.length}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link onClick={handleShowFilterModal} className="text-light">
                  <FontAwesomeIcon icon={faFilter} />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
  
          <Routes>
            <Route 
              path="/" 
              element={
                <RecipeList 
                  recipes={filteredRecipes}
                  toggleFavorite={toggleFavorite} 
                  favorites={favorites} 
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              } 
            />
          </Routes>
  
          <FilterModal
            show={showFilterModal}
            handleClose={handleCloseFilterModal}
            ingredients={ingredients}
            cuisines={cuisines} 
            selectedCuisines={selectedCuisines}
            selectedIngredients={selectedIngredients}
            handleFilterChange={(newSelectedCuisines, newSelectedIngredients) => {
              setSelectedCuisines(newSelectedCuisines);
              setSelectedIngredients(newSelectedIngredients);
              handleCloseFilterModal(); 
            }}
          />
          <Footer/>
        </div>
      </Router>
    );
  };

export default App;
